import { getEnv, isProduction } from "@/lib/cf-env"
import { sendLeadNotification } from "@/lib/notify"
import { verifyTurnstile } from "@/lib/turnstile"
import {
  countRecentByIp,
  findRecentDuplicate,
  hashIp,
  insertLead,
  markNotified,
  validateLead,
} from "@/lib/leads"

export { honeypotField, turnstileField } from "@/lib/form-fields"

const rateLimit = { max: 5, windowMinutes: 10 }
const duplicateWindowMinutes = 5

export type IntakeResult =
  | { ok: true; id: string | null; duplicate: boolean }
  | { ok: false; kind: "validation"; errors: Record<string, string> }
  | { ok: false; kind: "bot" }
  | { ok: false; kind: "challenge" }
  | { ok: false; kind: "rate-limit" }
  | { ok: false; kind: "unavailable" }

export type IntakeOptions = {
  source: string
  requireName?: boolean
  requireMessage?: boolean
  clientIp: string | null
  turnstileToken: string | null
  honeypotValue: string | null
}

export function clientIpFrom(request: Request): string | null {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Real-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    null
  )
}

export async function intakeLead(
  fields: Record<string, unknown>,
  options: IntakeOptions,
): Promise<IntakeResult> {
  // A filled honeypot means a bot walked the DOM. Treated as a silent success
  // upstream so the bot gets no signal about why it failed.
  if (options.honeypotValue && options.honeypotValue.trim().length > 0) {
    return { ok: false, kind: "bot" }
  }

  const validated = validateLead(fields, {
    requireName: options.requireName,
    requireMessage: options.requireMessage,
    source: options.source,
  })
  if (!validated.ok) return { ok: false, kind: "validation", errors: validated.errors }

  const env = await getEnv()

  if (env.TURNSTILE_SECRET_KEY) {
    const outcome = await verifyTurnstile(
      options.turnstileToken,
      env.TURNSTILE_SECRET_KEY,
      options.clientIp,
    )
    if (!outcome.ok) {
      // A Turnstile outage must not block real leads, so only a token that is
      // present and actually rejected counts as a failed challenge.
      if (outcome.reason === "rejected" || outcome.reason === "missing-token") {
        return { ok: false, kind: "challenge" }
      }
      console.warn("[leads] turnstile unavailable, allowing submission")
    }
  } else if (isProduction()) {
    console.warn("[leads] TURNSTILE_SECRET_KEY is not set — bot protection off")
  }

  const db = env.DB
  if (!db) {
    if (isProduction()) {
      console.error("[leads] D1 binding DB is missing; refusing to drop a lead")
      return { ok: false, kind: "unavailable" }
    }
    // Local `next dev` has no D1 binding. Surface the lead so form work is not
    // blocked, without claiming it was stored.
    console.info("[leads] no D1 binding (dev) — lead not persisted:", {
      ...validated.value,
      email: "[redacted]",
    })
    return { ok: true, id: null, duplicate: false }
  }

  const ipHash = options.clientIp
    ? await hashIp(options.clientIp, env.IP_HASH_SALT ?? "unsalted-dev")
    : null

  if (ipHash) {
    const recent = await countRecentByIp(db, ipHash, rateLimit.windowMinutes)
    if (recent >= rateLimit.max) return { ok: false, kind: "rate-limit" }
  }

  const duplicateId = await findRecentDuplicate(
    db,
    validated.value.email,
    validated.value.source,
    duplicateWindowMinutes,
  )
  if (duplicateId) return { ok: true, id: duplicateId, duplicate: true }

  const lead = await insertLead(db, validated.value, ipHash)

  if (env.RESEND_API_KEY && env.LEAD_NOTIFY_TO && env.LEAD_NOTIFY_FROM) {
    const adminUrl = env.ADMIN_BASE_URL
      ? `${env.ADMIN_BASE_URL.replace(/\/+$/, "")}/admin/leads`
      : null
    const sent = await sendLeadNotification(lead, {
      apiKey: env.RESEND_API_KEY,
      to: env.LEAD_NOTIFY_TO,
      from: env.LEAD_NOTIFY_FROM,
      adminUrl,
    })
    if (sent.ok) {
      await markNotified(db, lead.id, "sent")
    } else {
      // The lead is already saved. Record the failure and move on.
      console.error(`[leads] notification failed for ${lead.id}: ${sent.reason}`)
      await markNotified(db, lead.id, "failed")
    }
  } else {
    console.warn("[leads] Resend is not configured — notification skipped")
    await markNotified(db, lead.id, "failed")
  }

  return { ok: true, id: lead.id, duplicate: false }
}
