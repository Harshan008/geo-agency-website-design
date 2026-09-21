import { CtaLink } from "@/components/cta-link"
import { primaryCta, secondaryCta } from "@/lib/site"

export function CtaBand({
  title = "Turn your AI visibility problem into traction.",
  description = "Book a strategy call. Tell us what generative engines are missing about your business, and we'll shape a roadmap to fix it.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="bg-warm-glow relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 text-center sm:p-14">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="text-pretty text-muted-foreground">{description}</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <CtaLink href={primaryCta.href} size="lg">
              {primaryCta.label}
            </CtaLink>
            <CtaLink
              href={secondaryCta.href}
              variant="secondary"
              size="lg"
              withArrow={false}
            >
              {secondaryCta.label}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  )
}
