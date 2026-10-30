import { verifyAccess } from "@/lib/access"

export function adminJson(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  })
}

// Defence in depth for state-changing admin calls. A JSON PATCH/DELETE already
// needs a CORS preflight that this app never answers, so a cross-site request
// cannot reach these handlers from a browser; rejecting a foreign Origin
// outright removes any doubt.
function foreignOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  if (!origin) return false
  try {
    return new URL(origin).host !== request.headers.get("host")
  } catch {
    return true
  }
}

// Returns a rejection Response when the request is not authenticated, or null
// when it is. Every admin handler must call this first.
export async function requireAdmin(request: Request): Promise<Response | null> {
  if (request.method !== "GET" && foreignOrigin(request)) {
    return adminJson({ ok: false, error: "Request rejected." }, 403)
  }

  const result = await verifyAccess(request.headers)
  if (result.ok) return null

  if (result.reason === "not-configured") {
    console.error(
      "[admin] CF_ACCESS_TEAM_DOMAIN / CF_ACCESS_AUD are not set — denying admin access",
    )
    return adminJson({ ok: false, error: "Admin access is not configured." }, 503)
  }

  return adminJson({ ok: false, error: "Unauthorized." }, 401)
}
