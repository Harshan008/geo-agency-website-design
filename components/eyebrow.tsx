import { cn } from "@/lib/utils"

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.18em] text-primary",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-primary/50" />
      {children}
    </p>
  )
}
