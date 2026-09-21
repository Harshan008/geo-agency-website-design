export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <span className="sr-only">Loading</span>
      <div aria-hidden className="flex animate-pulse flex-col gap-6">
        <div className="h-3 w-28 rounded-full bg-muted" />
        <div className="h-12 w-full max-w-2xl rounded-lg bg-muted" />
        <div className="h-12 w-full max-w-xl rounded-lg bg-muted" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    </div>
  )
}
