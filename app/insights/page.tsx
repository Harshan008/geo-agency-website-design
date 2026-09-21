import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { InsightCard } from "@/components/insight-card"
import { CtaBand } from "@/components/cta-band"
import { Badge } from "@/components/badge"
import { formatDate } from "@/lib/format"
import { insights, insightCategories, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Research and practical writing on Generative Engine Optimization — how AI search and answer systems retrieve, interpret and cite sources.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: `Insights — ${site.name}`,
    description:
      "Research and practical writing on how AI search and answer systems retrieve, interpret and cite sources.",
    url: "/insights",
  },
}

export default function InsightsPage() {
  const [lead, ...rest] = insights
  const activeCategories = new Set(insights.map((insight) => insight.category))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} Insights`,
    description:
      "Research and practical writing on Generative Engine Optimization.",
    url: `${site.domain}/insights`,
    blogPost: insights.map((insight) => ({
      "@type": "BlogPosting",
      headline: insight.title,
      description: insight.thesis,
      datePublished: insight.published,
      dateModified: insight.updated,
      author: { "@type": "Person", name: insight.author },
      url: `${site.domain}/insights/${insight.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="Insights"
        title={
          <>
            Research on how generative engines{" "}
            <span className="font-serif italic text-primary">decide</span> what
            to cite
          </>
        }
        description="Practical, evidence-led writing on GEO. Each piece states its thesis in the first paragraph, lists its key findings, and names its limitations."
        crumbs={[{ label: "Insights", href: "/insights" }]}
      />

      <section
        aria-labelledby="categories-heading"
        className="border-b border-border/60"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-6 sm:px-6">
          <h2
            id="categories-heading"
            className="mr-2 text-xs uppercase tracking-[0.14em] text-muted-foreground"
          >
            Topics
          </h2>
          {insightCategories.map((category) => (
            <Badge
              key={category}
              variant={activeCategories.has(category) ? "solid" : "muted"}
            >
              {category}
            </Badge>
          ))}
        </div>
      </section>

      {lead && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="sr-only">Latest insight</h2>
          <Link
            href={`/insights/${lead.slug}`}
            className="group grid gap-8 rounded-3xl border border-border bg-card/40 p-8 transition-colors hover:border-primary/40 hover:bg-card sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <Badge>{lead.category}</Badge>
                <time dateTime={lead.published}>
                  {formatDate(lead.published)}
                </time>
                <span aria-hidden>·</span>
                <span>{lead.readingTime}</span>
              </div>
              <h3 className="text-balance text-3xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary sm:text-4xl">
                {lead.title}
              </h3>
              <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
                {lead.thesis}
              </p>
              <span className="text-sm text-primary">Read the analysis →</span>
            </div>

            <ul className="flex flex-col gap-3 border-t border-border/60 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <li className="text-xs uppercase tracking-[0.14em] text-primary/70">
                Key findings
              </li>
              {lead.keyFindings.slice(0, 3).map((finding) => (
                <li
                  key={finding}
                  className="flex gap-2.5 text-sm leading-relaxed text-foreground/90"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {finding}
                </li>
              ))}
            </ul>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="border-t border-border/60 bg-card/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              All insights
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((insight) => (
                <InsightCard key={insight.slug} insight={insight} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Reading about GEO is useful. Measuring your own is better."
        description="The audit applies the ideas in these articles to your domain and reports where you actually stand."
      />
    </>
  )
}
