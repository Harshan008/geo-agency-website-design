import { formatDate } from "@/lib/format"

export type LegalSection = { heading: string; body: string[] }

export function LegalBody({
  updated,
  sections,
}: {
  updated: string
  sections: LegalSection[]
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="border-b border-border/60 pb-6 text-sm text-muted-foreground">
        Last updated{" "}
        <time dateTime={updated}>{formatDate(updated)}</time>
      </p>

      <div className="mt-12 flex flex-col gap-11">
        {sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {section.heading}
            </h2>
            {section.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-pretty leading-relaxed text-foreground/85"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
