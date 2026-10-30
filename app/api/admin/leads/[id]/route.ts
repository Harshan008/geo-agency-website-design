import { getEnv } from "@/lib/cf-env"
import { adminJson, requireAdmin } from "@/lib/admin-guard"
import { deleteLead, isLeadStatus, updateLeadStatus } from "@/lib/leads"

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const rejected = await requireAdmin(request)
  if (rejected) return rejected

  const { id } = await context.params
  if (!uuidPattern.test(id)) {
    return adminJson({ ok: false, error: "Unknown lead." }, 404)
  }

  const env = await getEnv()
  if (!env.DB) return adminJson({ ok: false, error: "Storage is unavailable." }, 503)

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return adminJson({ ok: false, error: "Send a JSON body." }, 400)
  }

  const status = (body as { status?: unknown } | null)?.status
  if (!isLeadStatus(status)) {
    return adminJson({ ok: false, error: "Provide a valid status." }, 422)
  }

  try {
    const changed = await updateLeadStatus(env.DB, id, status)
    if (!changed) return adminJson({ ok: false, error: "Unknown lead." }, 404)
    return adminJson({ ok: true, id, status }, 200)
  } catch (error) {
    console.error("[admin] failed to update lead:", error)
    return adminJson({ ok: false, error: "Could not update the lead." }, 500)
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const rejected = await requireAdmin(request)
  if (rejected) return rejected

  const { id } = await context.params
  if (!uuidPattern.test(id)) {
    return adminJson({ ok: false, error: "Unknown lead." }, 404)
  }

  const env = await getEnv()
  if (!env.DB) return adminJson({ ok: false, error: "Storage is unavailable." }, 503)

  try {
    const removed = await deleteLead(env.DB, id)
    if (!removed) return adminJson({ ok: false, error: "Unknown lead." }, 404)
    return adminJson({ ok: true, id }, 200)
  } catch (error) {
    console.error("[admin] failed to delete lead:", error)
    return adminJson({ ok: false, error: "Could not delete the lead." }, 500)
  }
}
