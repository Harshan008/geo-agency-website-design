const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

export type TurnstileOutcome =
  | { ok: true }
  | { ok: false; reason: "missing-token" | "rejected" | "unavailable" }

export async function verifyTurnstile(
  token: string | null,
  secret: string,
  ip: string | null,
): Promise<TurnstileOutcome> {
  if (!token) return { ok: false, reason: "missing-token" }

  const body = new FormData()
  body.append("secret", secret)
  body.append("response", token)
  if (ip) body.append("remoteip", ip)

  try {
    const response = await fetch(verifyUrl, { method: "POST", body })
    if (!response.ok) return { ok: false, reason: "unavailable" }
    const result = (await response.json()) as { success?: boolean }
    return result.success === true ? { ok: true } : { ok: false, reason: "rejected" }
  } catch {
    return { ok: false, reason: "unavailable" }
  }
}
