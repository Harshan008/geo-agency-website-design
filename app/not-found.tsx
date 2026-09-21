import Link from "next/link"
import type { Metadata } from "next"
import { CtaLink } from "@/components/cta-link"
import { Eyebrow } from "@/components/eyebrow"

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page does not exist. Use the links below to reach the audit, services, methodology or research.",
  robots: { index: false, follow: true },
}

const destinations = [
  { label: "Run Your GEO Audit", href: "/audit", note: "Start here" },
  { label: "Services", href: "/services", note: "What we do" },
  { label: "Methodology", href: "/methodology", note: "How we work" },
  { label: "Insights", href: "/insights", note: "Research" },
  { label: "Glossary", href: "/glossary", note: "Terminology" },
  { label: "Contact", href: "/contact", note: "Talk to us" },
]

export default function NotFound() {
  return (
    <section className="bg-constellation border-b border-border/60">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-24 sm:px-6 sm:py-32">
        <Eyebrow>Error 404</Eyebrow>

        <div className="flex flex-col gap-4">
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            This page does not exist
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            The address you followed is wrong, or the page has moved. Everything
            on this site is reachable from the links below.
          </p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {destinations.map((destination) => (
            <li key={destination.href}>
              <Link
                href={destination.href}
                className="flex h-full flex-col gap-1 bg-background p-5 transition-colors hover:bg-card"
              >
                <span className="font-medium">{destination.label}</span>
                <span className="text-sm text-muted-foreground">
                  {destination.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <CtaLink href="/" variant="secondary" className="w-fit">
          Back to the homepage
        </CtaLink>
      </div>
    </section>
  )
}
