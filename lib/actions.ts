"use server"

import { headers } from "next/headers"
import type { FormState } from "@/lib/form-state"
import { honeypotField, intakeLead, turnstileField } from "@/lib/intake"
import { site } from "@/lib/site"

function text(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim()
}

async function clientIp(): Promise<string | null> {
  const list = await headers()
  return (
    list.get("CF-Connecting-IP") ??
    list.get("X-Real-IP") ??
    list.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    null
  )
}

function composeMessage(parts: [string, string][]): string {
  return parts
    .filter(([, value]) => value.length > 0)
    .map(([label, value]) => (label ? `${label}: ${value}` : value))
    .join("\n\n")
}

function failureState(
  result: Extract<Awaited<ReturnType<typeof intakeLead>>, { ok: false }>,
): FormState {
  switch (result.kind) {
    case "validation":
      return {
        status: "error",
        message: "Check the highlighted fields.",
        errors: result.errors,
      }
    case "challenge":
      return {
        status: "error",
        message: "We could not verify that you are human. Please try again.",
      }
    case "rate-limit":
      return {
        status: "error",
        message: "Too many submissions from this connection. Try again shortly.",
      }
    case "bot":
      // Silent success so an automated submitter learns nothing.
      return { status: "success", message: "Enquiry received." }
    case "unavailable":
      return {
        status: "error",
        message: `We could not save your enquiry. Please email ${site.email} directly.`,
      }
  }
}

export async function submitAudit(
  _prev: FormState,
  data: FormData,
): Promise<FormState> {
  const missing: Record<string, string> = {}
  if (!text(data, "website"))
    missing.website = "Enter the website you want analyzed."
  if (!text(data, "email"))
    missing.email = "Enter an email so we can send the report."
  if (Object.keys(missing).length > 0) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      errors: missing,
    }
  }

  const result = await intakeLead(
    {
      email: text(data, "email"),
      website: text(data, "website"),
      service: "GEO Audit",
      message: composeMessage([
        ["Wants to be cited for", text(data, "context")],
        ["Company type", text(data, "companyType")],
      ]),
    },
    {
      source: "audit",
      clientIp: await clientIp(),
      turnstileToken: text(data, turnstileField) || null,
      honeypotValue: text(data, honeypotField) || null,
    },
  )

  if (!result.ok) return failureState(result)

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
  // Form-specific required fields, checked before anything is stored.
  const required: [string, string][] = [
    ["name", "Enter your name."],
    ["email", "Enter your work email."],
    ["company", "Enter your company name."],
    ["website", "Enter your company website."],
    ["companyType", "Select the option that best describes your company."],
    ["objective", "Select your primary objective."],
    ["problem", "Describe the problem you want solved."],
  ]
  const missing: Record<string, string> = {}
  for (const [field, message] of required) {
    if (!text(data, field)) missing[field] = message
  }
  if (Object.keys(missing).length > 0) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      errors: missing,
    }
  }

  const result = await intakeLead(
    {
      name: text(data, "name"),
      email: text(data, "email"),
      company: text(data, "company"),
      website: text(data, "website"),
      service: text(data, "objective"),
      message: composeMessage([
        ["Problem to solve", text(data, "problem")],
        ["Company type", text(data, "companyType")],
        ["Other context", text(data, "context")],
      ]),
    },
    {
      source: "contact",
      requireName: true,
      requireMessage: true,
      clientIp: await clientIp(),
      turnstileToken: text(data, turnstileField) || null,
      honeypotValue: text(data, honeypotField) || null,
    },
  )

  if (!result.ok) {
    const state = failureState(result)
    // The shared validator reports the composed field as "message"; surface it
    // on the textarea the user actually filled in.
    if (result.kind === "validation" && result.errors.message) {
      const { message: composedError, ...rest } = result.errors
      return { ...state, errors: { ...rest, problem: composedError } }
    }
    return state
  }

  return {
    status: "success",
    message: "Enquiry received. You will get a reply at the email address you provided.",
  }
}
