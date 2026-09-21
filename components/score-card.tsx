import { cn } from "@/lib/utils"

export function ScoreCard({
  label,
  score,
  note,
}: {
  label: string
  score: number
  note?: string
}) {
  const pct = Math.max(0, Math.min(100, score))
  const tone =
    pct >= 75 ? "text-primary" : pct >= 45 ? "text-foreground" : "text-muted-foreground"

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card/40 p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={cn("font-serif text-2xl", tone)}>{pct}</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} score`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
      {note && <p className="text-xs text-muted-foreground">{note}</p>}
    </div>
  )
}
