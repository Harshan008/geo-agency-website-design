import Image from "next/image"
import { Play } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { ScrollReveal } from "@/components/scroll-reveal"
import { testimonials } from "@/lib/site"

// === CLIENT OUTCOMES ===
// HOW TO USE: add entries to `testimonials` in lib/site.ts. Until then this
// renders nothing — the homepage never shows invented clients or metrics.
// The first entry with a `videoUrl` becomes the video testimonial; the rest
// become outcome cards.
export function ClientProof() {
  if (testimonials.length === 0) return null

  const video = testimonials.find((t) => t.videoUrl)
  const cards = testimonials.filter((t) => t !== video).slice(0, 3)

  return (
    <section aria-label="Client outcomes" className="border-y border-border/60 bg-card/20">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Client outcomes"
          title="Outcomes, not vanity metrics"
          description="What changed for clients, in their words."
        />

        {/* === VIDEO TESTIMONIAL === */}
        {video?.videoUrl && (
          <ScrollReveal className="mt-12 grid gap-6 overflow-hidden rounded-3xl border border-border bg-card/40 md:grid-cols-2">
            <div className="relative aspect-video bg-background/60">
              <iframe
                src={video.videoUrl}
                title={`Video testimonial from ${video.name}`}
                loading="lazy"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
              <Play aria-hidden className="pointer-events-none absolute left-4 top-4 size-5 text-primary/70" />
            </div>
            <blockquote className="flex flex-col justify-center gap-4 p-6 sm:p-8">
              <p className="text-sm font-medium text-primary">{video.outcome}</p>
              <p className="text-pretty text-lg leading-relaxed">&ldquo;{video.quote}&rdquo;</p>
              <footer className="text-sm text-muted-foreground">
                {video.name} — {video.role}
              </footer>
            </blockquote>
          </ScrollReveal>
        )}

        {/* === OUTCOME CARDS === */}
        {cards.length > 0 && (
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {cards.map((t, i) => (
              <li key={t.name}>
                <ScrollReveal delay={i * 80} className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/40 p-6">
                  {t.logo && (
                    <Image src={t.logo.src} alt={t.logo.alt} width={120} height={32} loading="lazy" className="h-8 w-auto" />
                  )}
                  <p className="text-lg font-semibold tracking-tight text-primary">{t.outcome}</p>
                  <blockquote className="text-pretty leading-relaxed text-foreground/85">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="mt-auto text-sm text-muted-foreground">
                    {t.name} — {t.role}
                  </p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
