import Link from "next/link"
import type { Insight } from "@/lib/site"
import { formatDate } from "@/lib/format"

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="glow-interactive group flex flex-col gap-3 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40 hover:bg-card">
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="rounded-full border border-primary/30 px-2.5 py-0.5 text-primary">
          {insight.category}
        </span>
        <span>{insight.readingTime}</span>
      </div>
      <h3 className="text-lg font-semibold leading-snug tracking-tight">
        <Link
          href={`/insights/${insight.slug}`}
          className="transition-colors group-hover:text-primary"
        >
          {insight.title}
        </Link>
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {insight.thesis}
      </p>
      <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
        <span>{insight.author}</span>
        <span aria-hidden>·</span>
        <time dateTime={insight.published}>{formatDate(insight.published)}</time>
      </div>
    </article>
  )
}
