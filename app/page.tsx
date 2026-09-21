import Link from "next/link"
import type { Metadata } from "next"
import {
  Brain,
  Database,
  Compass,
  Sparkles,
  ArrowUpRight,
  Quote,
} from "lucide-react"
import { Hero } from "@/components/home/hero"
import { SectionHeading } from "@/components/section-heading"
import { ServiceCard } from "@/components/service-card"
import { InsightCard } from "@/components/insight-card"
import { ResultCard } from "@/components/result-card"
import { CtaLink } from "@/components/cta-link"
import { CtaBand } from "@/components/cta-band"
import {
  services,
  insights,
  results,
  methodology,
  site,
} from "@/lib/site"

export const metadata: Metadata = {
  title: "Generative Engine Optimization Agency",
  description: site.description,
  alternates: { canonical: "/" },
}

const pillars = [
  {
    icon: Brain,
    title: "AI Citation Engine",
    body: "Track how ChatGPT, Gemini and Perplexity surface, cite and attribute your brand across thousands of generative queries.",
  },
  {
    icon: Database,
    title: "Entity Graph Mapping",
    body: "Reverse-engineer the knowledge graph engines build of you — gaps, conflicts and missing relationships across the web.",
  },
  {
    icon: Compass,
    title: "Retrieval Visibility",
    body: "See which pages get pulled into AI overviews, what passages are quoted, and which competitors take the answer slot.",
  },
  {
    icon: Sparkles,
    title: "Action Playbooks",
    body: "Every engagement ships with a prioritized roadmap — content rewrites, schema patches and authority signals scored by impact.",
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* The shift — presented as a numbered citation ledger */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="The shift"
            title={
              <>
                The click is disappearing. The{" "}
                <span className="font-serif italic text-primary">citation</span>{" "}
                is the new front page.
              </>
            }
            description="Buyers get their answer inside ChatGPT, Gemini and Perplexity without ever clicking a result. If those systems can't read, understand and cite you, you're absent from the decision — no matter how you rank."
          />
        </div>

        <ol className="mt-14 flex flex-col divide-y divide-border/60 border-y border-border/60">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className="group grid items-start gap-4 py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-8"
            >
              <span className="font-serif text-3xl leading-none text-primary/60 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {p.title}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
              <span className="hidden self-center rounded-full border border-primary/30 bg-primary/10 p-2.5 text-primary sm:inline-flex">
                <p.icon className="size-5" />
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Strategy call pitch */}
      <section className="border-y border-border/60 bg-card/20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow="Your traction"
              title="Book a call to turn citation problems into measurable wins"
              description="If AI systems can't read, understand or cite you, you're absent from the answer. We start with your problem, not a template. One conversation shapes a roadmap."
            />
            <CtaLink href="/contact" size="lg" className="w-fit mx-auto mt-8">
              Book a Strategy Call
            </CtaLink>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Methodology"
          title="A repeatable system, not a one-off checklist"
          description="Six phases that take you from an unknown starting point to measured, compounding AI visibility."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {methodology.map((phase) => (
            <li
              key={phase.step}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card/40 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-serif text-2xl text-primary/70">
                  {phase.step}
                </span>
                <h3 className="text-lg font-semibold tracking-tight">
                  {phase.name}
                </h3>
              </div>
              <p className="text-sm font-medium text-foreground/90">
                {phase.question}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {phase.description}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <CtaLink href="/methodology" variant="secondary" withArrow>
            Explore the full methodology
          </CtaLink>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border/60 bg-card/20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Services"
              title="Scoped engagements for each part of GEO"
              description="Start with an audit, then take on the specific work that moves your citation share."
            />
            <CtaLink href="/services" variant="secondary" withArrow>
              View all services
            </CtaLink>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Evidence / results */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Evidence"
            title="Experiments and teardowns, not vanity metrics"
            description="We publish how we test, what we changed, and the observed result — including the limitations."
          />
          <CtaLink href="/results" variant="secondary" withArrow>
            See all results
          </CtaLink>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {results.map((study) => (
            <ResultCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      {/* Founder credibility */}
      <section className="border-y border-border/60 bg-card/20">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <Quote
            aria-hidden
            className="mx-auto mb-6 size-8 text-primary/60"
          />
          <p className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            &ldquo;GEO is not a rebrand of SEO. It is a different retrieval and
            citation layer — and it rewards businesses that make themselves
            unambiguous to machines.&rdquo;
          </p>
          <div className="mt-6 flex flex-col items-center gap-1">
            <span className="font-medium">{site.founder}</span>
            <span className="text-sm text-muted-foreground">
              {site.founderRole}
            </span>
          </div>
          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Why founder-led
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Insights"
            title="Research on how generative engines cite"
            description="Practical, evidence-led writing on GEO — designed to be quotable itself."
          />
          <CtaLink href="/insights" variant="secondary" withArrow>
            Read all insights
          </CtaLink>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {insights.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
