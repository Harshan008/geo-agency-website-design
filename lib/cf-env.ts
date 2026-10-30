// Minimal D1 surface, declared locally so the project does not need
// @cloudflare/workers-types as a dependency.
export type D1Result<T = unknown> = {
  results: T[]
  success: boolean
  meta: { changes?: number }
}

export type D1PreparedStatement = {
  bind: (...values: unknown[]) => D1PreparedStatement
  first: <T = unknown>(column?: string) => Promise<T | null>
  all: <T = unknown>() => Promise<D1Result<T>>
  run: () => Promise<D1Result>
}

export type D1Database = {
  prepare: (query: string) => D1PreparedStatement
  batch: (statements: D1PreparedStatement[]) => Promise<D1Result[]>
}

export type Env = {
  DB?: D1Database
  RESEND_API_KEY?: string
  LEAD_NOTIFY_TO?: string
  LEAD_NOTIFY_FROM?: string
  TURNSTILE_SECRET_KEY?: string
  NEXT_PUBLIC_TURNSTILE_SITE_KEY?: string
  IP_HASH_SALT?: string
  CF_ACCESS_TEAM_DOMAIN?: string
  CF_ACCESS_AUD?: string
  ADMIN_BASE_URL?: string
}

let cached: Env | undefined

// Bindings live on `cloudflare:workers` under vinext/wrangler. Plain `next dev`
// has no such module, so fall back to process.env there.
export async function getEnv(): Promise<Env> {
  if (cached) return cached
  try {
    const mod = await import(/* @vite-ignore */ "cloudflare:workers")
    cached = (mod as { env: Env }).env
  } catch {
    cached = process.env as unknown as Env
  }
  return cached
}

export function isProduction() {
  return process.env.NODE_ENV === "production"
}
