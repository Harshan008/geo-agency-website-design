import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { LegalBody } from "@/components/legal-body"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply to using ${site.domain}, including the GEO audit, published research and the limits of what those materials represent.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
}

const updated = "2026-03-01"

const sections = [
  {
    heading: "Agreement to these terms",
    body: [
      `These terms apply to your use of ${site.domain}, operated by ${site.name}. By using the site you accept them. If you do not accept them, do not use the site.`,
      "Registered entity details and governing jurisdiction are [LEGAL ENTITY DETAILS] and [GOVERNING LAW].",
    ],
  },
  {
    heading: "What this site is",
    body: [
      `${site.domain} describes the Generative Engine Optimization services offered by ${site.name}, publishes research on how AI search and answer systems work, and provides a GEO audit request form.`,
      "Nothing on this site is an offer capable of acceptance. Engagements begin only under a separate signed agreement.",
    ],
  },
  {
    heading: "The GEO audit",
    body: [
      "The audit analyzes publicly accessible pages and reports observed signals at the time of testing. It is diagnostic, not predictive.",
      "Generative engines vary by query, region, account and moment. Audit findings describe what was observed under the conditions tested and do not guarantee any future ranking, citation, traffic or revenue outcome.",
      "You must have the authority to request an audit of the website you submit.",
    ],
  },
  {
    heading: "No professional advice",
    body: [
      "Research, glossary entries and audit findings published here are general information about a fast-moving field. They are not legal, financial or other professional advice, and they should not be relied on as the sole basis for a business decision.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      `The content, design, methodology descriptions and published research on this site are owned by ${site.name} unless stated otherwise.`,
      "You may quote and cite this material with clear attribution and a link to the source page. You may not republish it in substantial part, or present it as your own.",
      "Third-party names referenced in our research belong to their respective owners and are used descriptively. Reference to a product or engine does not imply any partnership or endorsement.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "Do not use this site to submit false information, to request analysis of a site you have no authority over, to attempt unauthorized access, or to place an automated load on the site or its forms.",
    ],
  },
  {
    heading: "Availability and third-party links",
    body: [
      "We do not guarantee uninterrupted availability of the site or any of its features.",
      "Links to external sites are provided for reference. We do not control their content and are not responsible for it.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the extent permitted by law, we are not liable for indirect or consequential loss arising from use of this site or reliance on its published materials. Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      "These terms may change; the updated date at the top of this page reflects the current version.",
      `Questions about these terms can be sent to ${site.email}.`,
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        description={`The terms that apply to using ${site.domain}, its published research and the GEO audit.`}
        crumbs={[{ label: "Terms", href: "/terms" }]}
      />
      <LegalBody updated={updated} sections={sections} />
    </>
  )
}
