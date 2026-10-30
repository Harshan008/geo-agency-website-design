"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { graphEdges, graphNodes } from "@/components/knowledge-graph"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Eyebrow } from "@/components/eyebrow"
import { founder, site } from "@/lib/site"
import { cn } from "@/lib/utils"

// === STORY CONTENT ===
// Every statement here is something that is true of this business today.
// There are no client results and no invented origin events: the closing beat
// says so directly. Do not add either without the founder confirming them.
const beats = [
  {
    eyebrow: "The shift",
    title: "One answer, a few sources",
    body: "For twenty years the internet rewarded companies that ranked. AI answers don't work that way. They don't list ten links; they give one answer and name a few sources. A good business can be missing from it, not because it did anything wrong, but because nothing gave the machine a clear picture of who they are.",
  },
  {
    eyebrow: "What AI reads",
    title: "It resolves entities, not pages",
    body: "AI doesn't rank pages. It works out who a company is, what it does, and whether the evidence agrees. Tricks aimed at a ranking algorithm miss the point. A clear, consistent identity across the web is what it can actually use.",
  },
  {
    eyebrow: "How I work",
    title: "Three parts, one method",
    body: "Each part is a service you can read about in full.",
    parts: [
      {
        name: "Entity Graph",
        text: "I define who you are in a form machines can read, and reconcile conflicting descriptions across the web.",
        service: "Entity Optimization",
        href: "/services/entity-optimization",
      },
      {
        name: "Citation Engine",
        text: "I structure your content into answers engines can quote with confidence.",
        service: "Answer & Content Optimization",
        href: "/services/answer-content-optimization",
      },
      {
        name: "Evidence Layer",
        text: "I measure what AI says about you, and publish my experiments openly.",
        service: "AI Visibility Monitoring",
        href: "/services/ai-visibility-monitoring",
      },
    ],
  },
  {
    eyebrow: "Where this stands",
    title: "New, and open about it",
    body: "Lumen is new. I don't have client case studies yet, so I publish experiments and teardowns instead. You can judge the thinking before you hire me. The goal is a web where the best answer wins, not the loudest, and where trust comes from evidence, not ad spend.",
    link: { label: "Read the experiments", href: "/results" },
  },
] as const

// === VISUAL PANEL ===
// One visual per story beat. Beat 0 is an illustrative AI answer; beats 1–3
// reuse the site's knowledge-graph nodes and connect more of them each step.
function Visual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="flex h-full flex-col justify-center gap-4 p-6">
        <p className="text-xs uppercase tracking-[0.14em] text-primary/70">
          Illustration — an AI answer
        </p>
        <div className="rounded-2xl border border-border bg-background/60 p-5">
          <p className="text-sm text-muted-foreground">
            Best [category] for [need]?
          </p>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/85">
            One answer, drawn from a few sources.
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {["Source A", "Source B", "Source C"].map((s) => (
              <li
                key={s}
                className="rounded-full border border-border bg-card/60 px-4 py-1.5"
              >
                {s}
              </li>
            ))}
            <li className="rounded-full border border-dashed border-border px-4 py-1.5 text-muted-foreground">
              A good business that isn&apos;t understood — missing
            </li>
          </ul>
        </div>
      </div>
    )
  }

  // Edges revealed per step: none, the central node's links, then all of them.
  const visibleEdges = step === 1 ? 0 : step === 2 ? 7 : graphEdges.length
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      role="presentation"
    >
      <g stroke="oklch(0.81 0.12 82 / 0.4)" strokeWidth="0.9">
        {graphEdges.map(([a, b], i) => (
          <line
            key={i}
            x1={graphNodes[a].cx}
            y1={graphNodes[a].cy}
            x2={graphNodes[b].cx}
            y2={graphNodes[b].cy}
            className="transition-opacity duration-700 motion-reduce:transition-none"
            style={{
              opacity: i < visibleEdges ? 1 : 0,
              transitionDelay: `${i * 50}ms`,
            }}
          />
        ))}
      </g>
      <g>
        {graphNodes.map((n, i) => {
          const lit = "lit" in n && n.lit
          return (
            <circle
              key={i}
              cx={n.cx}
              cy={n.cy}
              r={n.r * (step === 3 && lit ? 1.5 : 1.2)}
              fill={
                step >= 2 && lit
                  ? "oklch(0.86 0.12 82)"
                  : "oklch(0.7 0.05 80 / 0.6)"
              }
              className="transition-all duration-700 motion-reduce:transition-none"
            />
          )
        })}
      </g>
    </svg>
  )
}

const captions = [
  "An AI answer names a few sources.",
  "Scattered, conflicting signals.",
  "Signals connect into one identity.",
  "One coherent, machine-readable identity.",
]

export function StoryScroll() {
  const [active, setActive] = useState(0)
  const beatRefs = useRef<(HTMLElement | null)[]>([])

  // Whichever beat crosses the middle of the viewport becomes the active one,
  // which swaps the pinned visual on desktop.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.beat))
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    beatRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      aria-label="The story behind Lumen"
      className="border-b border-border/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <ScrollReveal className="max-w-3xl">
          <Eyebrow>The story</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            The web taught machines to rank pages. I teach them to understand{" "}
            <span className="font-serif italic text-primary">businesses</span>.
          </h2>
          {/* Byline: who "I" is, and where, taken from the site's founder data. */}
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{site.founder}</span>
            <span aria-hidden="true">·</span>
            <span>{site.founderRole}</span>
            <span aria-hidden="true">·</span>
            <span>Based in {founder.location}</span>
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* === STORY BEATS === */}
          <div className="flex flex-col gap-16 lg:gap-0">
            {beats.map((beat, i) => (
              <article
                key={beat.eyebrow}
                ref={(el) => {
                  beatRefs.current[i] = el
                }}
                data-beat={i}
                className="flex flex-col justify-center gap-5 lg:min-h-[70vh]"
              >
                <ScrollReveal className="flex flex-col gap-4">
                  <Eyebrow>{beat.eyebrow}</Eyebrow>
                  <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                    {beat.title}
                  </h3>
                  <p className="text-pretty text-lg leading-relaxed text-foreground/85">
                    {beat.body}
                  </p>

                  {"parts" in beat && (
                    <ul className="mt-2 flex flex-col gap-3">
                      {beat.parts.map((part, j) => (
                        <li key={part.name}>
                          <ScrollReveal delay={j * 90}>
                            <Link
                              href={part.href}
                              aria-label={`${part.name}: ${part.service}`}
                              className="glow-interactive group flex flex-col gap-1 rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                              <span className="flex items-center justify-between gap-3">
                                <span className="font-semibold">
                                  {part.name}
                                </span>
                                <ArrowUpRight
                                  aria-hidden="true"
                                  className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
                                />
                              </span>
                              <span className="text-sm leading-relaxed text-muted-foreground">
                                {part.text}
                              </span>
                              <span className="text-xs text-primary/80">
                                Service: {part.service}
                              </span>
                            </Link>
                          </ScrollReveal>
                        </li>
                      ))}
                    </ul>
                  )}

                  {"link" in beat && (
                    <Link
                      href={beat.link.href}
                      className="inline-flex w-fit items-center gap-1 text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {beat.link.label}
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                  )}
                </ScrollReveal>

                {/* Mobile: the visual sits inline with its beat. */}
                <div
                  aria-hidden="true"
                  className="h-64 overflow-hidden rounded-3xl border border-border bg-card/40 lg:hidden"
                >
                  <Visual step={i} />
                </div>
              </article>
            ))}
          </div>

          {/* === PINNED VISUAL (desktop) === */}
          <div className="hidden lg:block">
            <div
              aria-hidden="true"
              className="sticky top-28 flex flex-col gap-3"
            >
              <div className="bg-warm-glow relative aspect-square overflow-hidden rounded-3xl border border-border bg-card/40">
                {beats.map((beat, i) => (
                  <div
                    key={beat.eyebrow}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none",
                      active === i ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <Visual step={i} />
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground">
                {captions[active]}
              </p>
            </div>
          </div>
        </div>

        {/* === PULL QUOTE === */}
        <ScrollReveal as="figure" className="mx-auto mt-20 max-w-3xl text-center">
          <blockquote className="text-balance font-serif text-3xl italic leading-tight text-primary sm:text-5xl">
            &ldquo;AI doesn&apos;t rank pages. It resolves entities.&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-muted-foreground">
            — {site.founder}, {site.founderRole}, {founder.location}
          </figcaption>
        </ScrollReveal>
      </div>
    </section>
  )
}
