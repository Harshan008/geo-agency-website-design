import type { D1Database } from "@/lib/cf-env"
import type {
  LeadRecord,
  LeadStatus,
  NotificationStatus,
} from "@/lib/lead-types"

export {
  isLeadStatus,
  leadStatuses,
  notificationStatuses,
} from "@/lib/lead-types"
export type {
  LeadRecord,
  LeadStatus,
  NotificationStatus,
} from "@/lib/lead-types"

export type NormalizedLead = {
  name: string | null
  email: string
  phone: string | null
  company: string | null
  website: string | null
  service: string | null
  budget: string | null
  message: string | null
  source: string
}

const limits = {
  name: 120,
  email: 254,
  phone: 40,
  company: 160,
  website: 300,
  service: 120,
  budget: 80,
  message: 5000,
  source: 40,
} as const

// Deliberately simple: catches shape errors without rejecting valid addresses
// that stricter patterns get wrong.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value: unknown): string {
  if (typeof value !== "string") return ""
  // Strip control characters, collapse runs of whitespace.
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function multiline(value: unknown): string {
  if (typeof value !== "string") return ""
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim()
}

function orNull(value: string): string | null {
  return value.length > 0 ? value : null
}

export function normalizeWebsite(value: string): string | null {
  const trimmed = clean(value)
  if (!trimmed) return null
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  try {
    const url = new URL(withScheme)
    if (url.protocol !== "http:" && url.protocol !== "https:") return null
    if (!url.hostname.includes(".")) return null
    return url.toString()
  } catch {
    return null
  }
}

export type ValidationResult =
  | { ok: true; value: NormalizedLead }
  | { ok: false; errors: Record<string, string> }

export function validateLead(
  raw: Record<string, unknown>,
  options: { requireName?: boolean; requireMessage?: boolean; source?: string } = {},
): ValidationResult {
  const errors: Record<string, string> = {}

  const name = clean(raw.name)
  const email = clean(raw.email).toLowerCase()
  const phone = clean(raw.phone)
  const company = clean(raw.company)
  const websiteRaw = clean(raw.website)
  const service = clean(raw.service)
  const budget = clean(raw.budget)
  const message = multiline(raw.message)
  const source = clean(options.source ?? raw.source) || "api"

  if (!email) errors.email = "Enter an email address."
  else if (email.length > limits.email) errors.email = "That email is too long."
  else if (!emailPattern.test(email)) errors.email = "Enter a valid email address."

  if (options.requireName && !name) errors.name = "Enter your name."
  if (options.requireMessage && !message)
    errors.message = "Describe the problem you want solved."

  let website: string | null = null
  if (websiteRaw) {
    if (websiteRaw.length > limits.website) errors.website = "That URL is too long."
    else {
      website = normalizeWebsite(websiteRaw)
      if (!website)
        errors.website = "Enter a valid website address, for example example.com."
    }
  }

  const overLength: [string, string, number][] = [
    ["name", name, limits.name],
    ["phone", phone, limits.phone],
    ["company", company, limits.company],
    ["service", service, limits.service],
    ["budget", budget, limits.budget],
    ["message", message, limits.message],
  ]
  for (const [field, value, max] of overLength) {
    if (value.length > max) errors[field] = "That value is too long."
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  return {
    ok: true,
    value: {
      name: orNull(name),
      email,
      phone: orNull(phone),
      company: orNull(company),
      website,
      service: orNull(service),
      budget: orNull(budget),
      message: orNull(message),
      source: source.slice(0, limits.source),
    },
  }
}

export async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${ip}`)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function isoMinutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString()
}

export async function countRecentByIp(
  db: D1Database,
  ipHash: string,
  windowMinutes: number,
): Promise<number> {
  const row = await db
    .prepare(
      "SELECT COUNT(*) AS n FROM leads WHERE ip_hash = ? AND created_at >= ?",
    )
    .bind(ipHash, isoMinutesAgo(windowMinutes))
    .first<{ n: number }>()
  return row?.n ?? 0
}

export async function findRecentDuplicate(
  db: D1Database,
  email: string,
  source: string,
  windowMinutes: number,
): Promise<string | null> {
  const row = await db
    .prepare(
      "SELECT id FROM leads WHERE email = ? AND source = ? AND created_at >= ? ORDER BY created_at DESC LIMIT 1",
    )
    .bind(email, source, isoMinutesAgo(windowMinutes))
    .first<{ id: string }>()
  return row?.id ?? null
}

export async function insertLead(
  db: D1Database,
  lead: NormalizedLead,
  ipHash: string | null,
): Promise<LeadRecord> {
  const id = crypto.randomUUID()
  const createdAt = new Date().toISOString()

  await db
    .prepare(
      `INSERT INTO leads
        (id, created_at, name, email, phone, company, website, service, budget,
         message, source, status, notification_status, notified_at, ip_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', 'pending', NULL, ?)`,
    )
    .bind(
      id,
      createdAt,
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      lead.website,
      lead.service,
      lead.budget,
      lead.message,
      lead.source,
      ipHash,
    )
    .run()

  return {
    id,
    created_at: createdAt,
    ...lead,
    status: "new",
    notification_status: "pending",
    notified_at: null,
  }
}

export async function markNotified(
  db: D1Database,
  id: string,
  status: NotificationStatus,
): Promise<void> {
  await db
    .prepare(
      "UPDATE leads SET notification_status = ?, notified_at = ? WHERE id = ?",
    )
    .bind(status, status === "sent" ? new Date().toISOString() : null, id)
    .run()
}

export async function listLeads(
  db: D1Database,
  options: { status?: LeadStatus; search?: string; limit: number; offset: number },
): Promise<{ leads: LeadRecord[]; total: number }> {
  const where: string[] = []
  const params: unknown[] = []

  if (options.status) {
    where.push("status = ?")
    params.push(options.status)
  }
  if (options.search) {
    // LIKE wildcards in user input are escaped so a search for "%" is literal.
    const term = `%${options.search.replace(/[\\%_]/g, "\\$&")}%`
    where.push(
      "(email LIKE ? ESCAPE '\\' OR name LIKE ? ESCAPE '\\' OR company LIKE ? ESCAPE '\\' OR website LIKE ? ESCAPE '\\')",
    )
    params.push(term, term, term, term)
  }

  const clause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : ""

  const totalRow = await db
    .prepare(`SELECT COUNT(*) AS n FROM leads ${clause}`)
    .bind(...params)
    .first<{ n: number }>()

  const rows = await db
    .prepare(
      `SELECT id, created_at, name, email, phone, company, website, service,
              budget, message, source, status, notification_status, notified_at
         FROM leads ${clause}
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?`,
    )
    .bind(...params, options.limit, options.offset)
    .all<LeadRecord>()

  return { leads: rows.results ?? [], total: totalRow?.n ?? 0 }
}

export async function updateLeadStatus(
  db: D1Database,
  id: string,
  status: LeadStatus,
): Promise<boolean> {
  const result = await db
    .prepare("UPDATE leads SET status = ? WHERE id = ?")
    .bind(status, id)
    .run()
  return (result.meta?.changes ?? 0) > 0
}

export async function deleteLead(db: D1Database, id: string): Promise<boolean> {
  const result = await db
    .prepare("DELETE FROM leads WHERE id = ?")
    .bind(id)
    .run()
  return (result.meta?.changes ?? 0) > 0
}

