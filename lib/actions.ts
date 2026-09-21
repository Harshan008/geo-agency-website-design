"use server"

import type { FormState } from "@/lib/form-state"

function text(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim()
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function normalizeUrl(value: string) {
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`
  try {
    const url = new URL(withScheme)
    return url.hostname.includes(".") ? url.toString() : null
  } catch {
    return null
  }
}

export async function submitAudit(
  _prev: FormState,
  data: FormData,
): Promise<FormState> {
  const errors: Record<string, string> = {}

  const website = text(data, "website")
  const email = text(data, "email")

  if (!website) errors.website = "Enter the website you want analyzed."
  else if (!normalizeUrl(website))
    errors.website = "Enter a valid website address, for example example.com."

  if (!email) errors.email = "Enter an email so we can send the report."
  else if (!isEmail(email)) errors.email = "Enter a valid email address."

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Check the highlighted fields.", errors }
  }

  // Delivery is not wired yet — connect an email or CRM destination here
  // before launch, or submissions are validated and then discarded.

  return {
    status: "success",
    message:
      "Request received. Your readiness report is prepared manually and sent to the email you provided.",
  }
}

export async function submitContact(
  _prev: FormState,
  data: FormData,
): Promise<FormState> {
  const errors: Record<string, string> = {}

  const required = {
    name: "Enter your name.",
    email: "Enter your work email.",
    company: "Enter your company name.",
    website: "Enter your company website.",
    companyType: "Select the option that best describes your company.",
    objective: "Select your primary objective.",
    problem: "Describe the problem you want solved.",
  }

  for (const [field, message] of Object.entries(required)) {
    if (!text(data, field)) errors[field] = message
  }

  const email = text(data, "email")
  if (email && !isEmail(email)) errors.email = "Enter a valid email address."

  const website = text(data, "website")
  if (website && !normalizeUrl(website))
    errors.website = "Enter a valid website address, for example example.com."

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Check the highlighted fields.", errors }
  }

  // Delivery is not wired yet — connect an email or CRM destination here
  // before launch, or submissions are validated and then discarded.

  return {
    status: "success",
    message:
      "Enquiry received. You will get a reply at the email address you provided.",
  }
}
