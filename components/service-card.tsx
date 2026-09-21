import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Service } from "@/lib/site"

export function ServiceCard({
  service,
  index,
}: {
  service: Service
  index: number
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="glow-interactive group relative flex flex-col gap-4 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40 hover:bg-card"
    >
      <div className="flex items-center justify-between">
        <span className="font-serif text-2xl text-primary/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{service.name}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {service.summary}
      </p>
      <p className="mt-auto text-xs uppercase tracking-[0.12em] text-primary/70">
        {service.deliverable}
      </p>
    </Link>
  )
}
