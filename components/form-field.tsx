import { cn } from "@/lib/utils"

const control =
  "glow-interactive w-full rounded-lg border border-input bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring aria-[invalid=true]:border-destructive"

export function Field({
  label,
  name,
  hint,
  error,
  optional,
  children,
}: {
  label: string
  name: string
  hint?: string
  error?: string
  optional?: boolean
  children: (props: {
    id: string
    name: string
    className: string
    "aria-invalid": boolean
    "aria-describedby": string | undefined
  }) => React.ReactNode
}) {
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
        {optional && (
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">
            Optional
          </span>
        )}
      </label>
      {children({
        id: name,
        name,
        className: control,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}
      {error ? (
        <p id={`${name}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${name}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function FormStatus({
  tone,
  children,
}: {
  tone: "success" | "error"
  children: React.ReactNode
}) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        tone === "success"
          ? "border-primary/40 bg-primary/10 text-foreground"
          : "border-destructive/50 bg-destructive/10 text-foreground",
      )}
    >
      {children}
    </p>
  )
}
