import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ResultStudy } from "@/lib/site"

export function ResultCard({ study }: { study: ResultStudy }) {
  return (
    <Link
      href={`/results/${study.slug}`}
      className="glow-interactive group flex flex-col gap-4 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40 hover:bg-card"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="rounded-full border border-primary/30 px-2.5 py-0.5 uppercase tracking-[0.12em] text-primary">
          {study.type}
        </span>
        <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
      <h3 className="text-lg font-semibold leading-snug tracking-tight">
        {study.title}
      </h3>
      <dl className="grid gap-2 text-sm">
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 text-muted-foreground">Industry</dt>
          <dd>{study.industry}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 text-muted-foreground">Problem</dt>
          <dd className="text-foreground/90">{study.problem}</dd>
        </div>
      </dl>
    </Link>
  )
}
