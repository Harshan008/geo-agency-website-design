import type { LeadRecord } from "@/lib/leads"

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

const fieldLabels: [keyof LeadRecord, string][] = [
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["company", "Company"],
  ["website", "Website"],
  ["service", "Service"],
  ["budget", "Budget"],
  ["source", "Source"],
]

function renderHtml(lead: LeadRecord, adminUrl: string | null): string {
  const rows = fieldLabels
    .map(([key, label]) => {
      const value = lead[key]
      if (!value) return ""
      return `<tr>
        <td style="padding:6px 16px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
        <td style="padding:6px 0;color:#111827;font-size:14px">${escapeHtml(String(value))}</td>
      </tr>`
    })
    .join("")

  const message = lead.message
    ? `<div style="margin-top:20px">
         <div style="color:#6b7280;font-size:13px;margin-bottom:6px">Message</div>
         <div style="white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.6;padding:12px 14px;background:#f9fafb;border-radius:8px">${escapeHtml(lead.message)}</div>
       </div>`
    : ""

  const link = adminUrl
    ? `<p style="margin-top:24px">
         <a href="${escapeHtml(adminUrl)}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:999px;font-size:14px">Open the admin dashboard</a>
       </p>`
    : ""

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto">
    <h1 style="margin:0 0 4px;font-size:18px;color:#111827">New lead</h1>
    <p style="margin:0 0 20px;color:#6b7280;font-size:13px">Received ${escapeHtml(lead.created_at)} (UTC)</p>
    <table style="border-collapse:collapse;width:100%">${rows}</table>
    ${message}
    ${link}
  </div>
</body></html>`
}

function renderText(lead: LeadRecord, adminUrl: string | null): string {
  const lines = ["New lead", `Received ${lead.created_at} (UTC)`, ""]
  for (const [key, label] of fieldLabels) {
    const value = lead[key]
    if (value) lines.push(`${label}: ${String(value)}`)
  }
  if (lead.message) lines.push("", "Message:", lead.message)
  if (adminUrl) lines.push("", `Admin dashboard: ${adminUrl}`)
  return lines.join("\n")
}

export type NotifyConfig = {
  apiKey: string
  to: string
  from: string
  adminUrl: string | null
}

// Never throws: the caller has already persisted the lead, and a failed
// notification must not turn into a failed submission.
export async function sendLeadNotification(
  lead: LeadRecord,
  config: NotifyConfig,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: lead.email,
        subject: `New lead — ${lead.company ?? lead.name ?? lead.email}`,
        html: renderHtml(lead, config.adminUrl),
        text: renderText(lead, config.adminUrl),
      }),
    })

    if (!response.ok) {
      return { ok: false, reason: `resend responded ${response.status}` }
    }
    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.name : "network error",
    }
  }
}
