"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { ArrowRight, Loader2 } from "lucide-react"
import { Field, FormStatus } from "@/components/form-field"
import { companyTypes, contactObjectives } from "@/lib/site"
import { submitContact } from "@/lib/actions"
import { initialFormState } from "@/lib/form-state"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="glow-interactive group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-[0.95rem] font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 aria-hidden className="size-4 animate-spin" />
          Sending…
        </>
      ) : (
        <>
          Request a Strategy Call
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  )
}

export function ContactForm() {
  const [state, action] = useActionState(submitContact, initialFormState)
  const errors = state.errors ?? {}

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/40 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight">Enquiry sent</h2>
        <FormStatus tone="success">{state.message}</FormStatus>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You'll hear from the founder shortly. If you have any existing audit results or data on your AI visibility, have them handy for the call.
        </p>
      </div>
    )
  }

  return (
    <form
      action={action}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card/40 p-6 sm:p-8"
    >
      {state.status === "error" && state.message && (
        <FormStatus tone="error">{state.message}</FormStatus>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          {(props) => (
            <input {...props} type="text" autoComplete="name" required />
          )}
        </Field>

        <Field label="Work email" name="email" error={errors.email}>
          {(props) => (
            <input {...props} type="email" autoComplete="email" required />
          )}
        </Field>

        <Field label="Company" name="company" error={errors.company}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="organization"
              required
            />
          )}
        </Field>

        <Field label="Company website" name="website" error={errors.website}>
          {(props) => (
            <input
              {...props}
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="yourcompany.com"
              required
            />
          )}
        </Field>
      </div>

      <Field
        label="Company type"
        name="companyType"
        error={errors.companyType}
      >
        {(props) => (
          <select {...props} defaultValue="" required>
            <option value="">Select a category</option>
            {companyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        label="Primary objective"
        name="objective"
        error={errors.objective}
      >
        {(props) => (
          <select {...props} defaultValue="" required>
            <option value="">Select an objective</option>
            {contactObjectives.map((objective) => (
              <option key={objective} value={objective}>
                {objective}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        label="What is the main problem you want solved?"
        name="problem"
        hint="Be specific. What are AI systems getting wrong, or missing, about your business?"
        error={errors.problem}
      >
        {(props) => <textarea {...props} rows={4} required />}
      </Field>

      <Field
        label="Anything else we should know"
        name="context"
        hint="Timelines, prior work, internal constraints."
        optional
      >
        {(props) => <textarea {...props} rows={3} />}
      </Field>

      <SubmitButton />
    </form>
  )
}
