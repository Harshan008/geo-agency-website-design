import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ServiceCard } from "@/components/service-card"
import { CtaBand } from "@/components/cta-band"
import { SectionHeading } from "@/components/section-heading"
import { services, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "GEO Services",
  description:
    "Scoped Generative Engine Optimization engagements — audit, visibility optimization, answer content, entity optimization, technical GEO and ongoing monitoring.",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Scoped engagements for every layer of{" "}
            <span className="font-serif italic text-primary">
              being cited
            </span>
          </>
        }
        description="Each engagement targets a specific reason AI engines fail to find, understand or cite you. Start with an audit, then take on the work that moves your citation share."
        crumbs={[{ label: "Services", href: "/services" }]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          The engagements
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="How engagements fit together"
            title="Audit first, then optimize where the return is highest"
            description="The audit establishes a baseline and a prioritized roadmap. Every other engagement plugs into that roadmap so work is sequenced by impact, not guesswork."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "First",
                body: "A GEO audit scores your readiness and produces the roadmap.",
              },
              {
                step: "Then",
                body: "Targeted optimization closes the highest-impact gaps.",
              },
              {
                step: "Ongoing",
                body: "Monitoring defends your citation share and feeds the next cycle.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-background/50 p-6"
              >
                <span className="text-xs uppercase tracking-[0.14em] text-primary/70">
                  {item.step}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title={`Not sure which engagement you need?`}
        description={`Start with an audit. The findings tell you — and ${site.founder} — exactly where to focus.`}
      />
    </>
  )
}
