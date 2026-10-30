import { getEnv } from "@/lib/cf-env"

// Verifies the Cloudflare Access JWT on admin requests. Header presence alone
// is not enough: if the Worker is ever reachable without passing through
// Access, a spoofed header would otherwise grant admin. The signature, the
// audience tag and the issuer are all checked.

type Jwk = {
  kid: string
  kty: string
  alg?: string
  n: string
  e: string
}

type CachedKeys = { keys: Jwk[]; fetchedAt: number }
let jwksCache: CachedKeys | undefined
const jwksTtlMs = 60 * 60 * 1000

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/")
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4))
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function decodeJson<T>(segment: string): T | null {
  try {
    return JSON.parse(new TextDecoder().decode(base64UrlToBytes(segment))) as T
  } catch {
    return null
  }
}

async function fetchJwks(teamDomain: string): Promise<Jwk[] | null> {
  if (jwksCache && Date.now() - jwksCache.fetchedAt < jwksTtlMs) {
    return jwksCache.keys
  }
  try {
    const response = await fetch(
      `https://${teamDomain}/cdn-cgi/access/certs`,
    )
    if (!response.ok) return null
    const body = (await response.json()) as { keys?: Jwk[] }
    if (!body.keys || body.keys.length === 0) return null
    jwksCache = { keys: body.keys, fetchedAt: Date.now() }
    return body.keys
  } catch {
    return null
  }
}

export type AccessIdentity = { email: string | null; subject: string | null }

export type AccessResult =
  | { ok: true; identity: AccessIdentity }
  | { ok: false; reason: "not-configured" | "missing-token" | "invalid-token" }

function normalizeTeamDomain(raw: string): string {
  const trimmed = raw.trim().replace(/^https?:\/\//, "").replace(/\/+$/, "")
  return trimmed.includes(".") ? trimmed : `${trimmed}.cloudflareaccess.com`
}

type HeaderSource = { get: (name: string) => string | null }

export async function verifyAccess(source: HeaderSource): Promise<AccessResult> {
  const env = await getEnv()
  const teamDomainRaw = env.CF_ACCESS_TEAM_DOMAIN
  const aud = env.CF_ACCESS_AUD

  // Fail closed. Without both values there is no way to authenticate a
  // request, so admin access is denied rather than assumed.
  if (!teamDomainRaw || !aud) return { ok: false, reason: "not-configured" }

  const teamDomain = normalizeTeamDomain(teamDomainRaw)

  const token =
    source.get("Cf-Access-Jwt-Assertion") ??
    readCookie(source.get("cookie"), "CF_Authorization")
  if (!token) return { ok: false, reason: "missing-token" }

  const parts = token.split(".")
  if (parts.length !== 3) return { ok: false, reason: "invalid-token" }

  const header = decodeJson<{ kid?: string; alg?: string }>(parts[0])
  const payload = decodeJson<{
    aud?: string | string[]
    iss?: string
    exp?: number
    nbf?: number
    email?: string
    sub?: string
  }>(parts[1])
  if (!header || !payload) return { ok: false, reason: "invalid-token" }
  if (header.alg !== "RS256") return { ok: false, reason: "invalid-token" }

  const keys = await fetchJwks(teamDomain)
  if (!keys) return { ok: false, reason: "invalid-token" }

  const jwk = keys.find((candidate) => candidate.kid === header.kid)
  if (!jwk) return { ok: false, reason: "invalid-token" }

  let verified = false
  try {
    const key = await crypto.subtle.importKey(
      "jwk",
      { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: "RS256", ext: true },
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    )
    verified = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      base64UrlToBytes(parts[2]),
      new TextEncoder().encode(`${parts[0]}.${parts[1]}`),
    )
  } catch {
    return { ok: false, reason: "invalid-token" }
  }
  if (!verified) return { ok: false, reason: "invalid-token" }

  const audiences = Array.isArray(payload.aud)
    ? payload.aud
    : payload.aud
      ? [payload.aud]
      : []
  if (!audiences.includes(aud)) return { ok: false, reason: "invalid-token" }

  if (payload.iss !== `https://${teamDomain}`)
    return { ok: false, reason: "invalid-token" }

  const nowSeconds = Math.floor(Date.now() / 1000)
  if (typeof payload.exp !== "number" || payload.exp <= nowSeconds)
    return { ok: false, reason: "invalid-token" }
  if (typeof payload.nbf === "number" && payload.nbf > nowSeconds + 60)
    return { ok: false, reason: "invalid-token" }

  return {
    ok: true,
    identity: { email: payload.email ?? null, subject: payload.sub ?? null },
  }
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null
  for (const part of header.split(";")) {
    const separator = part.indexOf("=")
    if (separator === -1) continue
    if (part.slice(0, separator).trim() === name) {
      return part.slice(separator + 1).trim() || null
    }
  }
  return null
}
