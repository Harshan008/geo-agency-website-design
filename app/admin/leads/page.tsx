import type { Metadata } from "next"
import { headers } from "next/headers"
import { verifyAccess } from "@/lib/access"
import { getEnv } from "@/lib/cf-env"
import { isLeadStatus, listLeads } from "@/lib/leads"
import { LeadsTable } from "@/components/admin/leads-table"

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
}

// Always request-time: this page reads the Access identity and live D1 rows.
export const dynamic = "force-dynamic"

function Shell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>
}) {
  const access = await verifyAccess(await headers())

  if (!access.ok) {
    if (access.reason === "not-configured") {
      return (
        <Shell title="Admin access is not configured">
          <p>
            Set <code>CF_ACCESS_TEAM_DOMAIN</code> and <code>CF_ACCESS_AUD</code>{" "}
            as Worker secrets, and put this route behind a Cloudflare Access
            application. Until then the dashboard stays closed.
          </p>
        </Shell>
      )
    }
    return (
      <Shell title="Unauthorized">
        <p>Sign in through Cloudflare Access to view leads.</p>
      </Shell>
    )
  }

  const env = await getEnv()
  if (!env.DB) {
    return (
      <Shell title="Storage unavailable">
        <p>
          The <code>DB</code> D1 binding is missing. Check{" "}
          <code>wrangler.jsonc</code> and redeploy.
        </p>
      </Shell>
    )
  }

  const params = await searchParams
  const status = isLeadStatus(params.status) ? params.status : undefined
  const search = params.q?.trim().slice(0, 120) || undefined

  const { leads, total } = await listLeads(env.DB, {
    status,
    search,
    limit: 200,
    offset: 0,
  })

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
        <p className="text-sm text-muted-foreground">
          {total} {total === 1 ? "lead" : "leads"}
          {access.identity.email ? ` · signed in as ${access.identity.email}` : ""}
        </p>
      </header>

      <div className="mt-8">
        <LeadsTable
          initialLeads={leads}
          initialStatus={status ?? ""}
          initialSearch={search ?? ""}
        />
      </div>
    </section>
  )
}
