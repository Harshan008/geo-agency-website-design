import { getEnv } from "@/lib/cf-env"
import { adminJson, requireAdmin } from "@/lib/admin-guard"
import { isLeadStatus, listLeads } from "@/lib/leads"

export async function GET(request: Request) {
  const rejected = await requireAdmin(request)
  if (rejected) return rejected

  const env = await getEnv()
  if (!env.DB) {
    return adminJson({ ok: false, error: "Storage is unavailable." }, 503)
  }

  const url = new URL(request.url)
  const statusParam = url.searchParams.get("status")
  const search = url.searchParams.get("q")?.trim().slice(0, 120) || undefined
  const limit = Math.min(
    Math.max(Number(url.searchParams.get("limit") ?? "50") || 50, 1),
    200,
  )
  const offset = Math.max(Number(url.searchParams.get("offset") ?? "0") || 0, 0)

  if (statusParam && !isLeadStatus(statusParam)) {
    return adminJson({ ok: false, error: "Unknown status filter." }, 422)
  }

  try {
    const { leads, total } = await listLeads(env.DB, {
      status: statusParam && isLeadStatus(statusParam) ? statusParam : undefined,
      search,
      limit,
      offset,
    })
    return adminJson({ ok: true, leads, total, limit, offset }, 200)
  } catch (error) {
    console.error("[admin] failed to list leads:", error)
    return adminJson({ ok: false, error: "Could not load leads." }, 500)
  }
}
