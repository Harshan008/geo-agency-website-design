"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { nav, primaryCta, site } from "@/lib/site"
import { CtaLink } from "@/components/cta-link"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 whitespace-nowrap font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="icon-mirror-sphere glow-interactive size-7 shrink-0 rounded-full"
          />
          <span>{site.name}</span>
          <span className="hidden text-xs font-normal uppercase tracking-[0.14em] text-muted-foreground sm:inline">
            GEO
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="glow-interactive rounded-full px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="glow-interactive whitespace-nowrap rounded-full px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Book a call
          </Link>
          <CtaLink href={primaryCta.href} size="md" className="whitespace-nowrap">
            {primaryCta.label}
          </CtaLink>
        </div>

        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-border/60 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <CtaLink href={primaryCta.href} size="md" className="w-full">
              {primaryCta.label}
            </CtaLink>
            <CtaLink
              href="/contact"
              variant="secondary"
              size="md"
              withArrow={false}
              className="w-full"
            >
              Book a Strategy Call
            </CtaLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
