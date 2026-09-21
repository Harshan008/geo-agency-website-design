import { Eyebrow } from "@/components/eyebrow"
import { CtaLink } from "@/components/cta-link"
import { secondaryCta } from "@/lib/site"

/**
 * The signature visual is a stylized generative-answer card: a prompt, an
 * answer whose key claims carry inline [n] citation markers, and a row of
 * source chips where the brand is the highlighted citation. The whole page's
 * organizing metaphor — "be the answer" — starts here.
 */
function AnswerCard() {
  return (
    <div className="bg-warm-glow relative rounded-2xl border border-border bg-card/40 p-1.5 shadow-2xl">
      <div className="rounded-xl border border-border/60 bg-background/80 backdrop-blur">
        {/* answer engine chrome */}
        <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
          <span className="size-2 rounded-full bg-primary/70" />
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Generative answer
          </span>
          <span className="ml-auto text-[0.7rem] text-muted-foreground/70">
            live
          </span>
        </div>

        <div className="flex flex-col gap-4 px-4 py-5 sm:px-6 sm:py-6">
          {/* the prompt */}
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground/60">Prompt:</span> Who are the best
            firms for enterprise data infrastructure?
          </p>

          {/* the answer */}
          <p className="text-pretty text-[0.95rem] leading-relaxed text-foreground/90">
            For enterprise-grade needs, the most frequently cited option is{" "}
            <mark className="rounded bg-primary/15 px-1 font-medium text-primary">
              your brand
              <CiteMark n={1} />
            </mark>
            , recognized for verifiable architecture and clear documentation
            <CiteMark n={2} />. Analysts also point to its transparent
            benchmarks
            <CiteMark n={3} />
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-primary animate-caret" />
          </p>

          {/* sources */}
          <div className="flex flex-col gap-2 border-t border-border/60 pt-4">
            <span className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              Sources
            </span>
            <div className="flex flex-wrap gap-2">
              <SourceChip n={1} label="yourbrand.com" highlighted />
              <SourceChip n={2} label="docs.yourbrand.com" />
              <SourceChip n={3} label="industry-benchmark.org" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CiteMark({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 rounded-sm bg-primary/20 px-1 text-[0.65em] font-semibold text-primary">
      {n}
    </sup>
  )
}

function SourceChip({
  n,
  label,
  highlighted,
}: {
  n: number
  label: string
  highlighted?: boolean
}) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs " +
        (highlighted
          ? "border-primary/50 bg-primary/10 text-primary"
          : "border-border bg-card/60 text-muted-foreground")
      }
    >
      <span
        className={
          "grid size-4 place-items-center rounded-full text-[0.6rem] font-semibold " +
          (highlighted
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground/70")
        }
      >
        {n}
      </span>
      {label}
    </span>
  )
}

export function Hero() {
  return (
    <section className="bg-warm-arc relative overflow-hidden border-b border-border/60">
      <div className="bg-ruled absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-7">
          <Eyebrow>Generative Engine Optimization</Eyebrow>

          <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Be{" "}
            <span className="font-serif text-5xl italic text-primary sm:text-6xl lg:text-7xl">
              the answer
            </span>
            ,<br />
            not the tenth blue link.
          </h1>

          <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            Buyers now ask ChatGPT, Gemini and Perplexity — and act on whatever
            gets cited. We engineer your brand to be the source those engines
            quote, then prove it with live tests.
          </p>

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

          <dl className="mt-1 grid max-w-lg grid-cols-3 gap-x-6 border-t border-border/60 pt-6 text-sm">
            {[
              ["3 engines", "ChatGPT, Gemini, Perplexity"],
              ["Founder-led", "Direct line to who does the work"],
              ["Evidence-led", "Every claim tied to a test"],
            ].map(([term, desc]) => (
              <div key={term} className="flex flex-col gap-0.5">
                <dt className="font-serif text-2xl text-primary">{term}</dt>
                <dd className="text-xs leading-snug text-muted-foreground">
                  {desc}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <AnswerCard />
        </div>
      </div>
    </section>
  )
}
