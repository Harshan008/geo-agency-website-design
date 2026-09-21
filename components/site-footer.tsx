import Link from "next/link"
import { services, site } from "@/lib/site"

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Methodology", href: "/methodology" },
      { label: "Results", href: "/results" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: services.slice(0, 5).map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-3">
            <Link href="/" className="font-semibold tracking-tight">
              {site.name}
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.tagline}. We improve how AI search and answer systems
              discover, understand and cite your business.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-primary hover:underline"
            >
              {site.email}
            </a>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="glow-interactive inline-block rounded-full px-1 text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Founder-led Generative Engine Optimization.</p>
        </div>
      </div>
    </footer>
  )
}
