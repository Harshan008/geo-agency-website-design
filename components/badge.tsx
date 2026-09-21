import { cn } from "@/lib/utils"

export function Badge({
  children,
  variant = "outline",
  className,
}: {
  children: React.ReactNode
  variant?: "outline" | "solid" | "muted"
  className?: string
}) {
  const variants = {
    outline: "border-primary/30 text-primary",
    solid: "border-transparent bg-primary/15 text-primary",
    muted: "border-border text-muted-foreground",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
