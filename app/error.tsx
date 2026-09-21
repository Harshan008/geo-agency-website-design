"use client"

import Link from "next/link"
import { Eyebrow } from "@/components/eyebrow"

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="bg-constellation border-b border-border/60">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-24 sm:px-6 sm:py-32">
        <Eyebrow>Something went wrong</Eyebrow>

        <div className="flex flex-col gap-4">
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            This page failed to load
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            The error has been logged. Try again, or go back to the homepage and
            take a different route to what you were looking for.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[0.95rem] font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card/40 px-7 text-[0.95rem] font-medium transition-colors hover:border-primary/40 hover:bg-card"
          >
            Back to the homepage
          </Link>
        </div>
      </div>
    </section>
  )
}
