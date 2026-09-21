import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { CtaBand } from "@/components/cta-band"
import { Callout } from "@/components/callout"
import { CtaLink } from "@/components/cta-link"
import { services, site } from "@/lib/site"

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    provider: { "@type": "Organization", name: site.name },
    serviceType: "Generative Engine Optimization",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="Service"
        title={service.name}
        description={service.summary}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-3">
            <h2 className="text-sm uppercase tracking-[0.14em] text-primary/70">
              Who needs it
            </h2>
            <p className="text-lg leading-relaxed text-foreground/90">
              {service.whoNeedsIt}
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm uppercase tracking-[0.14em] text-primary/70">
              The problem
            </h2>
            <p className="text-lg leading-relaxed text-foreground/90">
              {service.problem}
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-sm uppercase tracking-[0.14em] text-primary/70">
              What we do
            </h2>
            <ul className="flex flex-col gap-3">
              {service.whatWeDo.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <Check className="size-3" />
                  </span>
                  <span className="leading-relaxed text-foreground/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <Callout title="What you get">
            {service.deliverable}
          </Callout>

          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/contact" size="lg">
              Book a Strategy Call
            </CtaLink>
            <CtaLink
              href="/services"
              variant="secondary"
              size="lg"
              withArrow={false}
            >
              View All Services
            </CtaLink>
          </div>
        </div>
      </article>

      <section className="border-t border-border/60 bg-card/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Other services
            </h2>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View all
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col gap-2 rounded-2xl border border-border bg-background/50 p-6 transition-colors hover:border-primary/40"
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {s.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
