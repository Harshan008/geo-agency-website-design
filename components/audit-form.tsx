"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { ArrowRight, Loader2 } from "lucide-react"
import { Field, FormStatus } from "@/components/form-field"
import { companyTypes } from "@/lib/site"
import { submitAudit, initialFormState } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-[0.95rem] font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 aria-hidden className="size-4 animate-spin" />
          Analyzing signals…
        </>
      ) : (
        <>
          Run Your GEO Audit
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  )
}

export function AuditForm() {
  const [state, action] = useActionState(submitAudit, initialFormState)
  const errors = state.errors ?? {}

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/40 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight">
          Audit request received
        </h2>
        <FormStatus tone="success">{state.message}</FormStatus>
        <p className="text-sm leading-relaxed text-muted-foreground">
          While you wait, the methodology page explains exactly what each phase
          of the analysis does, and the results page shows how findings are
          documented.
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
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">
          Start your audit
        </h2>
        <p className="text-sm text-muted-foreground">
          Two required fields. The rest sharpens the analysis.
        </p>
      </div>

      {state.status === "error" && state.message && (
        <FormStatus tone="error">{state.message}</FormStatus>
      )}

      <Field
        label="Website URL"
        name="website"
        hint="The domain you want analyzed, for example example.com."
        error={errors.website}
      >
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

      <Field label="Work email" name="email" error={errors.email}>
        {(props) => (
          <input
            {...props}
            type="email"
            autoComplete="email"
            placeholder="you@yourcompany.com"
            required
          />
        )}
      </Field>

      <Field label="Company type" name="companyType" optional>
        {(props) => (
          <select {...props} defaultValue="">
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
        label="What do you want to be cited for?"
        name="context"
        hint="Name the questions or topics where you should be the source."
        optional
      >
        {(props) => (
          <textarea
            {...props}
            rows={3}
            placeholder="For example: enterprise data infrastructure vendors, or how to migrate from X to Y."
          />
        )}
      </Field>

      <SubmitButton />

      <p className="text-xs leading-relaxed text-muted-foreground">
        We analyze publicly accessible pages only. Your details are used to
        produce and send your audit — nothing else.
      </p>
    </form>
  )
}
