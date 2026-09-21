import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { SectionHeading } from "@/components/section-heading"
import { KnowledgeGraph } from "@/components/knowledge-graph"
import { CtaBand } from "@/components/cta-band"
import { founder, services, methodology, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a founder-led Generative Engine Optimization agency. ${site.founder} leads every engagement, covering how AI search and answer systems discover, understand and cite a business.`,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: `About — ${site.name}`,
    description: `${site.name} is a founder-led Generative Engine Optimization agency led by ${site.founder}.`,
    url: "/about",
  },
}

const entityFacts = [
  { label: "Organization", value: site.name },
  { label: "Category", value: "Generative Engine Optimization agency" },
  { label: "Founder", value: site.founder },
  { label: "Role", value: site.founderRole },
  { label: "Location", value: founder.location },
  { label: "Contact", value: site.email },
]

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: site.founder,
      jobTitle: site.founderRole,
      worksFor: {
        "@type": "Organization",
        name: site.name,
        url: site.domain,
        description: site.description,
      },
      knowsAbout: founder.expertise,
      url: `${site.domain}/about`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="About"
        title={
          <>
            {site.name} is a founder-led{" "}
            <span className="font-serif italic text-primary">GEO</span> agency
          </>
        }
        description={site.description}
        crumbs={[{ label: "About", href: "/about" }]}
      />

      {/* Entity facts first — this page exists to make the company and founder
          unambiguous to readers and to machine systems alike. */}
      <section
        aria-labelledby="entity-heading"
        className="border-b border-border/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2
            id="entity-heading"
            className="text-xs uppercase tracking-[0.14em] text-primary/70"
          >
            Entity summary
          </h2>
          <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {entityFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1 border-l border-border pl-5"
              >
                <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="text-lg font-medium tracking-tight">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Founder"
              title={site.founder}
              description={site.founderRole}
            />
            {founder.bio.map((paragraph, i) => (
              <p
                key={i}
                className="text-pretty leading-relaxed text-foreground/85"
              >
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              {founder.profiles.map((profile) => (
                <a
                  key={profile.label}
                  href={profile.url}
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/40 px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {profile.label}
                  <ArrowUpRight className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/40 p-8">
            <h2 className="text-xs uppercase tracking-[0.14em] text-primary/70">
              Areas of expertise
            </h2>
            <ul className="flex flex-col gap-3">
              {founder.expertise.map((area) => (
                <li key={area} className="flex gap-3 text-sm">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span className="leading-relaxed text-foreground/90">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
            <div
              aria-hidden
              className="mt-2 h-40 opacity-70"
            >
              <KnowledgeGraph />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="How the work connects"
            title="One company, one method, one set of engagements"
            description="Every part of this business relates to the others explicitly. That is both how the practice is organized and what it sells."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <article className="flex flex-col gap-3 rounded-2xl border border-border bg-background/50 p-6">
              <h3 className="font-semibold tracking-tight">Methodology</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {methodology.length} phases applied identically on every
                engagement, from Discover through Iterate.
              </p>
              <Link
                href="/methodology"
                className="mt-auto inline-flex items-center gap-1 pt-2 text-sm text-primary hover:underline"
              >
                Read the methodology
                <ArrowUpRight className="size-4" />
              </Link>
            </article>

            <article className="flex flex-col gap-3 rounded-2xl border border-border bg-background/50 p-6">
              <h3 className="font-semibold tracking-tight">Services</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {services.length} scoped engagements, each targeting a specific
                reason engines fail to cite a business.
              </p>
              <Link
                href="/services"
                className="mt-auto inline-flex items-center gap-1 pt-2 text-sm text-primary hover:underline"
              >
                See the services
                <ArrowUpRight className="size-4" />
              </Link>
            </article>

            <article className="flex flex-col gap-3 rounded-2xl border border-border bg-background/50 p-6">
              <h3 className="font-semibold tracking-tight">Research</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Published experiments, teardowns and analysis — including what
                each result does not prove.
              </p>
              <Link
                href="/results"
                className="mt-auto inline-flex items-center gap-1 pt-2 text-sm text-primary hover:underline"
              >
                Review the evidence
                <ArrowUpRight className="size-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Why founder-led"
          title="The person who diagnoses the problem does the work"
          description="GEO engagements fail when diagnosis and delivery are separated — the reasoning behind a finding gets lost before anything is changed. Here, the same person tests, decides and implements."
        />
        <p className="mt-6 leading-relaxed text-foreground/85">
          This constrains capacity deliberately. {site.name} takes on a limited
          number of engagements so that each one gets direct attention from{" "}
          {site.founder} rather than being handed to an account layer.
        </p>
      </section>

      <CtaBand
        title={`Talk to ${site.founder} directly.`}
        description="Start with an audit so the first conversation begins with findings rather than introductions."
      />
    </>
  )
}
