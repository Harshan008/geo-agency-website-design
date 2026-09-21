import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function Callout({
  title,
  children,
  className,
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border border-border bg-muted/40 p-5",
        className,
      )}
    >
      <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
      <div className="flex flex-col gap-1">
        {title && <p className="text-sm font-medium">{title}</p>}
        <div className="text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  )
}
