import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs"
import { Eyebrow } from "@/components/eyebrow"

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  crumbs: Crumb[]
}) {
  return (
    <header className="bg-constellation relative border-b border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 sm:py-20">
        <Breadcrumbs items={crumbs} />
        <div className="flex max-w-3xl flex-col gap-4">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
