import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { CtaBand } from "@/components/cta-band"
import { Badge } from "@/components/badge"
import { glossary, services, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "GEO Glossary",
  description:
    "Definitions of Generative Engine Optimization terminology — retrieval, citation, answer slot, entity, structured data, share of answer and more.",
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: `GEO Glossary — ${site.name}`,
    description:
      "Definitions of Generative Engine Optimization terminology, each with why it matters and a common misunderstanding.",
    url: "/glossary",
  },
}

/** Related entries name either another glossary term or one of the services. */
function relatedHref(related: string) {
  const key = related.toLowerCase()
  const term = glossary.find(
    (g) => g.term.toLowerCase() === key || g.slug === key.replace(/\s+/g, "-"),
  )
  if (term) return `#${term.slug}`

  const service = services.find((s) => s.name.toLowerCase() === key)
  return service ? `/services/${service.slug}` : null
}

export default function GlossaryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "GEO Glossary",
    description:
      "Definitions of Generative Engine Optimization terminology.",
    url: `${site.domain}/glossary`,
    hasDefinedTerm: glossary.map((entry) => ({
      "@type": "DefinedTerm",
      name: entry.term,
      description: entry.definition,
      url: `${site.domain}/glossary#${entry.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="Glossary"
        title={
          <>
            The vocabulary of{" "}
            <span className="font-serif italic text-primary">
              generative search
            </span>
          </>
        }
        description="Precise definitions for the terms used across this site. Each entry states what the term means, why it matters, an example, and the misunderstanding it most often attracts."
        crumbs={[{ label: "Glossary", href: "/glossary" }]}
      />

      <nav
        aria-label="Glossary terms"
        className="border-b border-border/60 bg-card/20"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-6 sm:px-6">
          {glossary.map((entry) => (
            <a
              key={entry.slug}
              href={`#${entry.slug}`}
              className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {entry.term}
            </a>
          ))}
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col">
          {glossary.map((entry) => (
            <article
              key={entry.slug}
              id={entry.slug}
              className="scroll-mt-24 border-b border-border/60 py-12 first:pt-0 last:border-0"
            >
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {entry.term}
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-foreground/90">
                {entry.definition}
              </p>

              <dl className="mt-7 flex flex-col gap-7">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <dt className="text-xs uppercase tracking-[0.14em] text-primary/70">
                      Why it matters
                    </dt>
                    <dd className="text-sm leading-relaxed text-muted-foreground">
                      {entry.whyItMatters}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-2">
                    <dt className="text-xs uppercase tracking-[0.14em] text-primary/70">
                      Example
                    </dt>
                    <dd className="text-sm leading-relaxed text-muted-foreground">
                      {entry.example}
                    </dd>
                  </div>
                </div>

                <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/40 p-5">
                  <dt className="text-xs uppercase tracking-[0.14em] text-primary/70">
                    Common misunderstanding
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">
                    {entry.misunderstanding}
                  </dd>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <dt className="mr-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Related
                  </dt>
                  {entry.related.map((related) => {
                    const href = relatedHref(related)
                    return (
                      <dd key={related} className="contents">
                        {href ? (
                          <a href={href}>
                            <Badge className="transition-colors hover:bg-primary/10">
                              {related}
                            </Badge>
                          </a>
                        ) : (
                          <Badge variant="muted">{related}</Badge>
                        )}
                      </dd>
                    )
                  })}
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Know the terms. Now measure your own position."
        description="The audit scores your business against the signals these definitions describe."
      />
    </>
  )
}
