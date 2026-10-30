import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { LegalBody } from "@/components/legal-body"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Which cookies and similar technologies ${site.name} uses on this site, why, and how to control them.`,
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
}

const updated = "2026-10-30"

// === COOKIE POLICY CONTENT ===
// Placeholder policy. Every bracketed value must be confirmed against what the
// live site actually sets (check browser dev tools → Application → Cookies)
// before this page is treated as final.
const sections = [
  {
    heading: "What this policy covers",
    body: [
      `This policy explains how ${site.name} ("we") uses cookies and similar technologies on ${site.domain}. Questions can be sent to ${site.email}.`,
      "A cookie is a small text file a website stores in your browser. Similar technologies, such as local storage, work the same way for the purposes of this policy.",
    ],
  },
  {
    heading: "Strictly necessary",
    body: [
      "These are needed for the site's forms and security to work, and cannot be switched off in our systems. They include the bot-protection check (Cloudflare Turnstile) that runs on the contact form to stop automated spam.",
      "[CONFIRM EXACT COOKIE NAMES AND LIFETIMES SET BY TURNSTILE AND CLOUDFLARE].",
    ],
  },
  {
    heading: "Analytics",
    body: [
      "We measure aggregate, page-level usage so we can see which pages are read. [CONFIRM ANALYTICS PROVIDER AND WHETHER IT SETS COOKIES OR IS COOKIELESS].",
      "We do not use analytics data to identify you personally, and we do not use it for advertising.",
    ],
  },
  {
    heading: "Advertising and tracking",
    body: [
      "[CONFIRM: NO ADVERTISING OR CROSS-SITE TRACKING COOKIES ARE SET]. If this changes, this page will be updated before the change goes live.",
    ],
  },
  {
    heading: "Managing cookies and consent",
    body: [
      "You can block or delete cookies in your browser settings. Blocking strictly necessary cookies may stop the contact form from working.",
      "[COOKIE CONSENT MECHANISM — DESCRIBE THE BANNER OR PREFERENCE CONTROL, OR STATE THAT NONE IS NEEDED BECAUSE ONLY STRICTLY NECESSARY COOKIES ARE USED].",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "When this policy changes, the updated date at the top of this page changes with it.",
    ],
  },
]

export default function CookiePolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Cookie Policy"
        description={`Which cookies and similar technologies ${site.name} uses, and how to control them.`}
        crumbs={[{ label: "Cookie Policy", href: "/cookies" }]}
      />
      <LegalBody updated={updated} sections={sections} />
    </>
  )
}
