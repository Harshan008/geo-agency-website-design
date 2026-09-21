import type { Metadata } from "next"
import Link from "next/link"
import { Mail, ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ContactForm } from "@/components/contact-form"
import { founder, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description: `Request a strategy call with ${site.founder} at ${site.name}. Tell us your company, your primary objective and the AI visibility problem you need solved.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${site.name}`,
    description: `Request a strategy call with ${site.founder}.`,
    url: "/contact",
  },
}

const expectations = [
  {
    title: "You get a reply from the founder",
    body: `${site.founder} reads every enquiry. There is no account layer between you and the person who would do the work.`,
  },
  {
    title: "We will say if we are not the right fit",
    body: "If your problem is classical SEO, paid acquisition or general marketing, we will tell you rather than reshaping it into a GEO engagement.",
  },
  {
    title: "Bring data if you have it",
    body: "If you have AI visibility data, existing audit results, or competitor comparisons, they sharpen the call. The conversation still works without them.",
  },
]

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: `${site.domain}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: site.name,
      email: site.email,
      url: site.domain,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Book a{" "}
            <span className="font-serif italic text-primary">
              strategy call
            </span>
          </>
        }
        description="This form is read by the person who would run your engagement. The more specific you are about the problem, the more useful the first call will be."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <ContactForm />

          <div className="flex flex-col gap-10 lg:sticky lg:top-24">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                What to expect
              </h2>
              <div className="flex flex-col divide-y divide-border/60 border-y border-border/60">
                {expectations.map((item) => (
                  <div key={item.title} className="flex flex-col gap-1.5 py-5">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/40 p-6">
              <h2 className="text-xs uppercase tracking-[0.14em] text-primary/70">
                Direct contact
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 text-lg font-medium transition-colors hover:text-primary"
              >
                <Mail aria-hidden className="size-5 text-primary" />
                {site.email}
              </a>
              <div className="flex flex-wrap gap-3 pt-1">
                {founder.profiles.map((profile) => (
                  <a
                    key={profile.label}
                    href={profile.url}
                    rel="me noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {profile.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <h2 className="font-semibold tracking-tight">
                Ready to improve your traction?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {site.founder} reads every enquiry personally. Be specific about what AI systems are missing about your business, and the first call focuses on solution, not discovery.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
