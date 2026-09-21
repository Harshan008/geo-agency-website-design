import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  href: string
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost"
  size?: "md" | "lg"
  className?: string
  withArrow?: boolean
}

const base =
  "glow-interactive group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "border border-border bg-card/40 text-foreground hover:bg-card hover:border-primary/40",
  ghost: "text-foreground/80 hover:text-foreground",
}

const sizes = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[0.95rem]",
}

export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = true,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
      {withArrow && (
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </Link>
  )
}
