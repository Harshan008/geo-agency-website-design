import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { SectionHeading } from "@/components/section-heading"
import { CtaBand } from "@/components/cta-band"
import { Callout } from "@/components/callout"
import { CtaLink } from "@/components/cta-link"
import { methodology, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "GEO Methodology",
  description:
    "The six-phase process used to diagnose and improve AI visibility: Discover, Diagnose, Identify Gaps, Optimize, Measure, Iterate.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: `GEO Methodology — ${site.name}`,
    description:
      "The six-phase process used to diagnose and improve AI visibility.",
    url: "/methodology",
  },
}

const principles = [
  {
    title: "Diagnose before prescribing",
    body: "No content is written and no markup is added until we know which signal is actually failing. Most AI visibility problems are misdiagnosed as content volume problems.",
  },
  {
    title: "Measure against a baseline",
    body: "Every engagement captures how engines describe and cite you before any change. Without that capture, improvement cannot be distinguished from engine drift.",
  },
  {
    title: "State the limits",
    body: "Generative engines vary by query, region, account and moment. We report what we observed and under what conditions, not what we would like to claim.",
  },
  {
    title: "Fix causes, not symptoms",
    body: "A brand described incorrectly does not need more pages. It needs the contradictions between its existing descriptions removed.",
  },
]

export default function MethodologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Generative Engine Optimization methodology",
    description:
      "A six-phase process for diagnosing and improving how AI search and answer systems discover, understand and cite a business.",
    step: methodology.map((phase, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: phase.name,
      text: phase.description,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="Methodology"
        title={
          <>
            Six phases from{" "}
            <span className="font-serif italic text-primary">unknown</span> to
            measured AI visibility
          </>
        }
        description="The same process runs on every engagement. It starts with what engines currently understand about you, isolates what blocks citation, fixes those specific things, and measures whether it worked."
        crumbs={[{ label: "Methodology", href: "/methodology" }]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <ol className="flex flex-col">
          {methodology.map((phase, i) => (
            <li
              key={phase.step}
              className="grid gap-6 border-b border-border/60 py-10 first:pt-0 last:border-0 lg:grid-cols-[auto_1fr_0.8fr] lg:gap-12"
            >
              <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                <span className="font-serif text-5xl leading-none text-primary/50 tabular-nums">
                  {phase.step}
                </span>
                {i < methodology.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden h-full w-px bg-border lg:block"
                  />
                )}
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {phase.name}
                </h2>
                <p className="font-serif text-lg italic text-primary/90">
                  {phase.question}
                </p>
                <p className="max-w-xl leading-relaxed text-muted-foreground">
                  {phase.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/40 p-5">
                <h3 className="text-xs uppercase tracking-[0.14em] text-primary/70">
                  Outputs
                </h3>
                <ul className="flex flex-col gap-2">
                  {phase.outputs.map((output) => (
                    <li
                      key={output}
                      className="flex items-start gap-2 text-sm text-foreground/90"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                      />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border/60 bg-card/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Operating principles"
            title="The rules the process follows"
            description="These constrain what we will and will not claim, and they are the reason the method is repeatable rather than improvised."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-background/50 p-6"
              >
                <h3 className="font-semibold tracking-tight">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-6">
          <Callout title="Where the methodology is documented">
            Each phase produces artifacts we publish where we can. The{" "}
            <a href="/results" className="text-primary hover:underline">
              results
            </a>{" "}
            section shows the method applied end to end, and{" "}
            <a href="/insights" className="text-primary hover:underline">
              insights
            </a>{" "}
            explains the reasoning behind individual phases.
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
              See the engagements
            </CtaLink>
          </div>
        </div>
      </section>

      <CtaBand
        title="Phase one is the audit. Start there."
        description="The audit is the Discover and Diagnose phases run against your domain. Everything after it depends on what those phases find."
      />
    </>
  )
}
