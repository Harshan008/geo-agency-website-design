import type { Metadata } from "next"
import { ShieldCheck } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { SectionHeading } from "@/components/section-heading"
import { AuditForm } from "@/components/audit-form"
import { ScoreCard } from "@/components/score-card"
import { Callout } from "@/components/callout"
import { CtaLink } from "@/components/cta-link"
import { Badge } from "@/components/badge"
import {
  auditSignals,
  auditLimitations,
  auditPrivacy,
  site,
} from "@/lib/site"

export const metadata: Metadata = {
  title: "Run Your GEO Audit",
  description:
    "Analyze how AI search and answer systems currently discover, understand and cite your business. Six signal areas, scored, with a prioritized list of what blocks citation.",
  alternates: { canonical: "/audit" },
  openGraph: {
    title: `Run Your GEO Audit — ${site.name}`,
    description:
      "Analyze how AI search and answer systems currently discover, understand and cite your business.",
    url: "/audit",
  },
}

const exampleScores = [
  { label: "Crawlability", score: 82, note: "Key pages render as text." },
  {
    label: "Semantic Structure",
    score: 64,
    note: "Headings rarely state a question.",
  },
  {
    label: "Entity Clarity",
    score: 41,
    note: "Three conflicting company descriptions.",
  },
  {
    label: "Structured Data",
    score: 55,
    note: "Markup omits founder and services.",
  },
  {
    label: "Answer Readiness",
    score: 38,
    note: "Definitions depend on page context.",
  },
  {
    label: "Citation Presence",
    score: 29,
    note: "Cited for brand queries only.",
  },
]

export default function AuditPage() {
  return (
    <>
      <PageHeader
        eyebrow="GEO Audit"
        title={
          <>
            See what AI engines{" "}
            <span className="font-serif italic text-primary">actually say</span>{" "}
            about your business
          </>
        }
        description="The audit tests six signal areas that decide whether generative engines can find, understand and cite you. You get a score for each one and a ranked list of what to fix first."
        crumbs={[{ label: "Audit", href: "/audit" }]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <AuditForm />
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                What the audit analyzes
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Each signal below is a distinct reason a business fails to
                appear in AI answers. They are assessed separately because the
                fix for each one is different.
              </p>
            </div>

            <dl className="flex flex-col divide-y divide-border/60 border-y border-border/60">
              {auditSignals.map((signal, i) => (
                <div key={signal.name} className="flex gap-5 py-5">
                  <span className="font-serif text-2xl leading-none text-primary/60 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1">
                    <dt className="font-medium">{signal.name}</dt>
                    <dd className="text-sm leading-relaxed text-muted-foreground">
                      {signal.description}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Example output"
            title="What the report looks like"
            description="Every signal gets a score and a stated reason. The reason is the part that matters — it tells you what to change."
          />

          <div className="mt-10 rounded-3xl border border-border bg-background/60 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">
                  GEO Readiness Report
                </span>
                <span className="text-xs text-muted-foreground">
                  example.com
                </span>
              </div>
              <Badge variant="muted">Illustrative example</Badge>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {exampleScores.map((score) => (
                <ScoreCard key={score.label} {...score} />
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-border/60 pt-6">
              <h3 className="text-sm uppercase tracking-[0.14em] text-primary/70">
                Prioritized actions
              </h3>
              <ol className="flex flex-col gap-3">
                {[
                  "Reconcile the three conflicting company descriptions into one canonical entity profile.",
                  "Rewrite the six highest-value definitions as self-contained passages.",
                  "Add Organization and Service markup that matches the visible page content.",
                ].map((action, i) => (
                  <li key={action} className="flex gap-3 text-sm">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-[0.7rem] font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed text-foreground/90">
                      {action}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Scores and actions shown here are illustrative. Your report
              reflects live tests against your own domain.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Limitations"
              title="What this audit does not tell you"
              description="Stating the limits is part of the method. An audit that claims more than it can measure is not evidence."
            />
            <ul className="flex flex-col gap-3">
              {auditLimitations.map((limitation) => (
                <li
                  key={limitation}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60"
                  />
                  {limitation}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Privacy"
              title="How your data is handled"
              description="The audit needs a URL and an email. It does not need access to anything private."
            />
            <div className="flex flex-col gap-3">
              {auditPrivacy.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-xl border border-border bg-card/40 p-5"
                >
                  <ShieldCheck
                    aria-hidden
                    className="mt-0.5 size-5 shrink-0 text-primary"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Callout title="Full detail">
              Our complete data-handling terms are set out in the{" "}
              <a href="/privacy" className="text-primary hover:underline">
                privacy policy
              </a>
              .
            </Callout>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Already know what is wrong?
          </h2>
          <p className="text-pretty text-muted-foreground">
            If you have a diagnosis and need a roadmap, skip the audit and bring
            the problem straight to a strategy call with {site.founder}.
          </p>
          <CtaLink href="/contact" variant="secondary" size="lg">
            Book a Strategy Call
          </CtaLink>
        </div>
      </section>
    </>
  )
}
