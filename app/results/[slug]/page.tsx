import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowUpRight, TriangleAlert } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { CtaBand } from "@/components/cta-band"
import { CtaLink } from "@/components/cta-link"
import { Badge } from "@/components/badge"
import { results, site } from "@/lib/site"

export function generateStaticParams() {
  return results.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = results.find((s) => s.slug === slug)
  if (!study) return {}

  return {
    title: study.title,
    description: study.problem,
    alternates: { canonical: `/results/${study.slug}` },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.problem,
      url: `/results/${study.slug}`,
    },
  }
}

export default async function ResultDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = results.find((s) => s.slug === slug)
  if (!study) notFound()

  const others = results.filter((s) => s.slug !== study.slug)

  const sections = [
    { heading: "Problem", body: study.problem },
    { heading: "Diagnosis", body: study.diagnosis },
    { heading: "Intervention", body: study.intervention },
    { heading: "Evidence", body: study.evidence },
    { heading: "Observed result", body: study.observedResult },
    { heading: "Lessons", body: study.lessons },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.problem,
    author: { "@type": "Person", name: site.founder },
    publisher: { "@type": "Organization", name: site.name },
    url: `${site.domain}/results/${study.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow={study.type}
        title={study.title}
        description={study.problem}
        crumbs={[
          { label: "Results", href: "/results" },
          { label: study.title, href: `/results/${study.slug}` },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <dl className="flex flex-wrap gap-x-10 gap-y-4 border-b border-border/60 pb-8">
          <div className="flex flex-col gap-1">
            <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Type
            </dt>
            <dd>
              <Badge>{study.type}</Badge>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Industry
            </dt>
            <dd className="text-sm font-medium">{study.industry}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Subject
            </dt>
            <dd className="text-sm font-medium">[CASE STUDY SUBJECT]</dd>
          </div>
        </dl>

        <div className="mt-12 flex flex-col gap-11">
          {sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2 className="text-sm uppercase tracking-[0.14em] text-primary/70">
                {section.heading}
              </h2>
              <p className="text-lg leading-relaxed text-foreground/90">
                {section.body}
              </p>
            </section>
          ))}

          <section className="flex gap-3 rounded-2xl border border-border bg-muted/40 p-6">
            <TriangleAlert
              aria-hidden
              className="mt-0.5 size-5 shrink-0 text-primary"
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-medium">Limitations</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {study.limitations}
              </p>
            </div>
          </section>

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
              View Services
            </CtaLink>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-border/60 bg-card/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Other studies
              </h2>
              <Link
                href="/results"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View all
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/results/${other.slug}`}
                    className="group flex h-full flex-col gap-2 rounded-2xl border border-border bg-background/50 p-6 transition-colors hover:border-primary/40"
                  >
                    <span className="font-medium">{other.title}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {other.problem}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  )
}
