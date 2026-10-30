import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { SectionHeading } from "@/components/section-heading"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CtaBand } from "@/components/cta-band"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Trust Center",
  description: `How ${site.name} handles the information you send us, how the site is protected, and where to find our policies.`,
  alternates: { canonical: "/trust" },
  robots: { index: true, follow: true },
}

// === SECURITY PRACTICES ===
// Every item below describes something this codebase actually does (see the
// lead-capture section of README.md). Do not add a practice here unless it is
// implemented and can be verified.
const practices = [
  {
    title: "Encrypted connections",
    body: "The site is served over HTTPS through Cloudflare.",
  },
  {
    title: "Spam and bot protection",
    body: "The contact form uses a hidden honeypot field, a Cloudflare Turnstile check and rate limiting before a submission is accepted.",
  },
  {
    title: "No raw IP storage",
    body: "To detect duplicates and abuse we store a salted hash of the submitter's IP address, never the address itself.",
  },
  {
    title: "Restricted access to enquiries",
    body: "Submitted enquiries are kept in a private database. The admin dashboard sits behind Cloudflare Access, and the server independently verifies the access token, so the dashboard stays closed unless sign-in succeeds.",
  },
  {
    title: "Enquiry first, notification second",
    body: "An enquiry is stored before any email is sent, so a failed notification never loses your message.",
  },
]

// === POLICY LINKS ===
const policies = [
  { label: "Privacy Policy", href: "/privacy", note: "What we collect and why" },
  { label: "Terms of Service", href: "/terms", note: "The terms of using this site" },
  { label: "Cookie Policy", href: "/cookies", note: "Cookies and similar technologies" },
  { label: "Accessibility Statement", href: "/accessibility", note: "Our accessibility commitment" },
]

export default function TrustCenterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust Center"
        title="How we protect what you share"
        description={`${site.name} is a small, founder-led practice. This page states plainly what we do, and what we do not claim.`}
        crumbs={[{ label: "Trust Center", href: "/trust" }]}
      />

      {/* === SECURITY PRACTICES === */}
      <section
        aria-label="Security practices"
        className="border-b border-border/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Security practices"
            title="What the site does today"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {practices.map((item, i) => (
              <li key={item.title}>
                <ScrollReveal
                  delay={i * 70}
                  className="h-full rounded-2xl border border-border bg-card/40 p-6"
                >
                  <h3 className="text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* === CERTIFICATIONS === */}
      <section
        aria-label="Certifications"
        className="border-b border-border/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Certifications"
            title="What we do and do not hold"
          />
          <ScrollReveal className="mt-8 max-w-3xl rounded-2xl border border-border bg-card/40 p-6">
            <p className="text-pretty leading-relaxed text-muted-foreground">
              We do not currently hold any third-party security certification or
              attestation, and we do not display badges for any.
            </p>
            <p className="mt-3 text-pretty leading-relaxed text-foreground/85">
              [CERTIFICATIONS AND ATTESTATIONS — LIST ONLY THOSE ACTUALLY HELD,
              WITH ISSUER AND DATE. LEAVE THIS PLACEHOLDER IN PLACE UNTIL THEN.]
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* === POLICIES === */}
      <section
        aria-label="Policies"
        className="border-b border-border/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Policies"
            title="Read the details"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {policies.map((policy, i) => (
              <li key={policy.href}>
                <ScrollReveal delay={i * 70}>
                  <Link
                    href={policy.href}
                    aria-label={`${policy.label}: ${policy.note}`}
                    className="glow-interactive group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <span className="flex flex-col gap-1">
                      <span className="font-medium">{policy.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {policy.note}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                    />
                  </Link>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* === SECURITY CONTACT === */}
      <section aria-label="Report a concern">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Report a concern"
            title="Found a security issue?"
          />
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {site.email}
            </a>{" "}
            with what you found and how to reproduce it. We aim to reply within
            [RESPONSE PERIOD].
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
