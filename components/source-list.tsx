import type { Source } from "@/lib/site"

export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <ol className="flex flex-col divide-y divide-border/60 border-y border-border/60">
      {sources.map((source, i) => (
        <li key={i} className="flex gap-4 py-4">
          <span className="font-serif text-lg leading-none text-primary/60 tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-0.5">
            <cite className="text-sm font-medium not-italic">
              {source.title}
            </cite>
            <span className="text-xs text-muted-foreground">
              {source.publisher} — {source.url}
            </span>
          </div>
        </li>
      ))}
    </ol>
  )
}
