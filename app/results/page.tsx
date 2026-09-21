import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ResultCard } from "@/components/result-card"
import { CtaBand } from "@/components/cta-band"
import { Callout } from "@/components/callout"
import { results, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Results",
  description:
    "Documented GEO experiments and public teardowns. Each one states the problem, the diagnosis, the intervention, the evidence, the observed result and the limitations.",
  alternates: { canonical: "/results" },
  openGraph: {
    title: `Results — ${site.name}`,
    description:
      "Documented GEO experiments and public teardowns, including their limitations.",
    url: "/results",
  },
}

export default function ResultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Results"
        title={
          <>
            Experiments and teardowns, documented in{" "}
            <span className="font-serif italic text-primary">full</span>
          </>
        }
        description="Every study below follows the same structure: what the problem was, what diagnosis we reached, what we changed, what evidence we captured, what we observed, and what the result does not prove."
        crumbs={[{ label: "Results", href: "/results" }]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Callout title="Why there are no client case studies here yet">
          {site.name} publishes only work it can document and evidence. Client
          engagements are covered by confidentiality until a client agrees to
          publication. In the meantime, the studies below are GEO experiments
          and public teardowns run on our own initiative, with the full method
          shown.
        </Callout>

        <h2 className="mt-14 text-xl font-semibold tracking-tight sm:text-2xl">
          Published studies
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {results.map((study) => (
            <ResultCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            How each study is structured
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            The same nine fields appear in every study so results can be
            compared against each other rather than read as isolated stories.
          </p>
          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Industry", "The market the subject operates in."],
              ["Problem", "The visibility failure that prompted the study."],
              ["Diagnosis", "The underlying cause we identified."],
              ["Intervention", "The specific change that was made."],
              ["Evidence", "How the before and after state was captured."],
              ["Observed result", "What changed, stated without extrapolation."],
              ["Limitations", "What the result does not prove."],
              ["Lessons", "What generalizes beyond this case."],
              ["Type", "Whether it is an experiment or a public teardown."],
            ].map(([term, description]) => (
              <div key={term} className="flex flex-col gap-1">
                <dt className="text-sm font-medium text-primary">{term}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        title="Run the same analysis on your own domain."
        description="The audit applies the diagnostic half of these studies to your business and returns the findings in the same structure."
      />
    </>
  )
}
