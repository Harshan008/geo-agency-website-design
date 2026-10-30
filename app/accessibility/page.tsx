import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { LegalBody } from "@/components/legal-body"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `${site.name}'s commitment to making this site usable by everyone, the standard we work toward, and how to report a barrier.`,
  alternates: { canonical: "/accessibility" },
  robots: { index: true, follow: true },
}

const updated = "2026-10-30"

// === ACCESSIBILITY STATEMENT CONTENT ===
// Written as a commitment and a target, not a conformance claim. Do not state
// that the site "conforms" or is "fully accessible" until an audit supports it.
const sections = [
  {
    heading: "Our commitment",
    body: [
      `${site.name} wants everyone to be able to use this site, including people who use screen readers, keyboard navigation, magnification or other assistive technology.`,
      "We are working toward conformance with the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA.",
    ],
  },
  {
    heading: "Current status",
    body: [
      "We have not yet had this site independently audited, so we do not claim full conformance with WCAG 2.2 AA.",
      "[ACCESSIBILITY AUDIT DATE AND METHOD — FILL IN ONCE AN AUDIT HAS BEEN DONE, OR REMOVE THIS LINE].",
    ],
  },
  {
    heading: "What we do",
    body: [
      "Pages use semantic HTML landmarks and a single descriptive heading hierarchy.",
      "Interactive elements are reachable and operable with a keyboard and show a visible focus state.",
      "Animation and motion respect the reduced-motion setting in your operating system.",
    ],
  },
  {
    heading: "Known limitations",
    body: [
      "[LIST ANY KNOWN ISSUES, FOR EXAMPLE DECORATIVE BACKGROUND GRAPHICS OR THIRD-PARTY WIDGETS SUCH AS THE BOT-PROTECTION CHECK].",
    ],
  },
  {
    heading: "Report a barrier",
    body: [
      `If something on this site is hard to use, email ${site.email} with the page address and a description of the problem. We aim to respond within [RESPONSE PERIOD].`,
    ],
  },
  {
    heading: "Formal complaints",
    body: [
      "[JURISDICTION-SPECIFIC ENFORCEMENT OR COMPLAINT PROCEDURE — DEPENDS ON LEGAL ENTITY AND LOCATION].",
    ],
  },
]

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Accessibility Statement"
        description={`How ${site.name} works to make this site usable by everyone, and how to tell us when it isn't.`}
        crumbs={[{ label: "Accessibility", href: "/accessibility" }]}
      />
      <LegalBody updated={updated} sections={sections} />
    </>
  )
}
