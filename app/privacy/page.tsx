import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { LegalBody } from "@/components/legal-body"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, stores and deletes the information submitted through the GEO audit and contact forms.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
}

const updated = "2026-03-01"

const sections = [
  {
    heading: "Who this policy covers",
    body: [
      `This policy describes how ${site.name} ("we") handles information collected through ${site.domain}. ${site.name} is the data controller for that information. Questions about this policy can be sent to ${site.email}.`,
      "The registered entity details, including jurisdiction and registered address, are [LEGAL ENTITY DETAILS].",
    ],
  },
  {
    heading: "What we collect",
    body: [
      "GEO audit form: the website URL you submit, your email address, and any optional company type or context you choose to provide.",
      "Contact form: your name, email address, company name, company website, company type, primary objective, the problem description you write, and any optional context.",
      "Email correspondence: whatever you include when you write to us directly.",
      "Site analytics: aggregate page-level usage data collected through Vercel Analytics. This does not use cookies to identify individuals.",
    ],
  },
  {
    heading: "What we do not collect",
    body: [
      "We do not request or access credentials for your website, analytics accounts, advertising platforms or any other private system.",
      "The audit reads only publicly accessible pages — the same pages a search or AI crawler can reach without authentication.",
      "We do not collect special category personal data, and you should not include any in a form field.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "To produce and deliver the GEO audit you requested.",
      "To reply to your enquiry and, where relevant, to arrange and prepare for a strategy call.",
      "To maintain a record of enquiries and engagements for business administration.",
      "We do not use your information for automated decision-making, profiling, or advertising.",
    ],
  },
  {
    heading: "Who we share it with",
    body: [
      "We do not sell, rent or trade your information.",
      "We use service providers to operate the site and communicate with you — hosting and analytics (Vercel) and [EMAIL PROVIDER]. These providers process information on our instructions only.",
      "We disclose information where we are legally required to do so.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Audit submissions and their reports are retained for [RETENTION PERIOD] unless you ask us to delete them sooner.",
      "Enquiry records are retained for [RETENTION PERIOD], or for the duration of a client relationship plus any period required for legal and accounting obligations.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      `You can ask us to provide a copy of the information we hold about you, correct it, or delete it. Email ${site.email} and we will respond within [RESPONSE PERIOD].`,
      "Depending on where you live, you may also have the right to object to or restrict certain processing, to data portability, and to complain to your local data protection authority.",
    ],
  },
  {
    heading: "Security",
    body: [
      "Information submitted through this site is transmitted over encrypted connections and stored with access limited to people who need it to deliver the service.",
      "No transmission or storage method is completely secure, and we do not claim otherwise.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "When this policy changes, the updated date at the top of this page changes with it. Material changes affecting how we use information already collected will be communicated directly where we hold a contact address for you.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How ${site.name} collects, uses, stores and deletes information submitted through this site.`}
        crumbs={[{ label: "Privacy", href: "/privacy" }]}
      />
      <LegalBody updated={updated} sections={sections} />
    </>
  )
}
