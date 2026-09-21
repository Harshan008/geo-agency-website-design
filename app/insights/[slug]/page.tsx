import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { InsightCard } from "@/components/insight-card"
import { SourceList } from "@/components/source-list"
import { Callout } from "@/components/callout"
import { CtaLink } from "@/components/cta-link"
import { CtaBand } from "@/components/cta-band"
import { Badge } from "@/components/badge"
import { formatDate } from "@/lib/format"
import { insights, site } from "@/lib/site"

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const insight = insights.find((i) => i.slug === slug)
  if (!insight) return {}

  return {
    title: insight.title,
    description: insight.thesis,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: "article",
      title: insight.title,
      description: insight.thesis,
      url: `/insights/${insight.slug}`,
      publishedTime: insight.published,
      modifiedTime: insight.updated,
      authors: [insight.author],
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description: insight.thesis,
    },
  }
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const insight = insights.find((i) => i.slug === slug)
  if (!insight) notFound()

  const related = insights.filter((i) => i.slug !== insight.slug).slice(0, 2)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.thesis,
    articleSection: insight.category,
    datePublished: insight.published,
    dateModified: insight.updated,
    author: { "@type": "Person", name: insight.author },
    publisher: { "@type": "Organization", name: site.name },
    url: `${site.domain}/insights/${insight.slug}`,
    mainEntityOfPage: `${site.domain}/insights/${insight.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow={insight.category}
        title={insight.title}
        crumbs={[
          { label: "Insights", href: "/insights" },
          { label: insight.title, href: `/insights/${insight.slug}` },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border/60 pb-6 text-sm text-muted-foreground">
          <span className="text-foreground">{insight.author}</span>
          <span aria-hidden>·</span>
          <span>
            Published{" "}
            <time dateTime={insight.published}>
              {formatDate(insight.published)}
            </time>
          </span>
          {insight.updated !== insight.published && (
            <>
              <span aria-hidden>·</span>
              <span>
                Updated{" "}
                <time dateTime={insight.updated}>
                  {formatDate(insight.updated)}
                </time>
              </span>
            </>
          )}
          <Badge variant="muted" className="ml-auto">
            {insight.readingTime}
          </Badge>
        </div>

        {/* The thesis leads, so the direct answer is the first thing read —
            by a person skimming and by a retrieval system lifting a passage. */}
        <section aria-labelledby="thesis" className="mt-10">
          <h2 id="thesis" className="sr-only">
            Thesis
          </h2>
          <p className="border-l-2 border-primary pl-6 text-xl leading-relaxed text-foreground sm:text-2xl">
            {insight.thesis}
          </p>
        </section>

        <div className="mt-12 flex flex-col gap-11">
          {insight.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-pretty leading-relaxed text-foreground/85"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <section
          aria-labelledby="key-findings"
          className="mt-14 flex flex-col gap-5 rounded-2xl border border-border bg-card/40 p-6 sm:p-8"
        >
          <h2
            id="key-findings"
            className="text-sm uppercase tracking-[0.14em] text-primary/70"
          >
            Key findings
          </h2>
          <ul className="flex flex-col gap-3">
            {insight.keyFindings.map((finding) => (
              <li key={finding} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
                />
                <span className="leading-relaxed text-foreground/90">
                  {finding}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="evidence" className="mt-14 flex flex-col gap-4">
          <h2
            id="evidence"
            className="text-2xl font-semibold tracking-tight"
          >
            Evidence and sources
          </h2>
          <p className="leading-relaxed text-foreground/85">
            {insight.evidence}
          </p>
          <SourceList sources={insight.sources} />
        </section>

        <section
          aria-labelledby="implications"
          className="mt-14 flex flex-col gap-4"
        >
          <h2
            id="implications"
            className="text-2xl font-semibold tracking-tight"
          >
            What to do with this
          </h2>
          <ol className="flex flex-col gap-3">
            {insight.implications.map((implication, i) => (
              <li key={implication} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="leading-relaxed text-foreground/90">
                  {implication}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="conclusion"
          className="mt-14 flex flex-col gap-4"
        >
          <h2
            id="conclusion"
            className="text-2xl font-semibold tracking-tight"
          >
            Conclusion
          </h2>
          <p className="text-pretty leading-relaxed text-foreground/85">
            {insight.conclusion}
          </p>
        </section>

        <div className="mt-14 flex flex-col gap-6">
          <Callout title="Ready to improve your traction?">
            The signals in this article are what generative engines use to cite or ignore your business.
            A strategy call helps you prioritize which ones to focus on first.
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
              Explore Services
            </CtaLink>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border/60 bg-card/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Related reading
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <InsightCard key={item.slug} insight={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  )
}
