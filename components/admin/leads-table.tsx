"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { ChevronDown, Loader2, Search, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { leadStatuses, type LeadRecord, type LeadStatus } from "@/lib/lead-types"

const statusTone: Record<LeadStatus, string> = {
  new: "border-primary/40 bg-primary/10 text-foreground",
  contacted: "border-border bg-muted/40 text-muted-foreground",
  qualified: "border-primary/30 bg-primary/5 text-foreground",
  won: "border-primary/60 bg-primary/20 text-foreground",
  archived: "border-border/60 bg-transparent text-muted-foreground",
}

function formatDate(iso: string): string {
  const parsed = new Date(iso)
  if (Number.isNaN(parsed.getTime())) return iso
  return parsed.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

export function LeadsTable({
  initialLeads,
  initialStatus,
  initialSearch,
}: {
  initialLeads: LeadRecord[]
  initialStatus: string
  initialSearch: string
}) {
  const [leads, setLeads] = useState(initialLeads)
  const [status, setStatus] = useState(initialStatus)
  const [search, setSearch] = useState(initialSearch)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const firstRender = useRef(true)

  // Refetch when the filters change, so filtering covers every stored lead
  // rather than only the rows already on screen.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const controller = new AbortController()
    const timer = setTimeout(() => {
      const params = new URLSearchParams()
      if (status) params.set("status", status)
      if (search.trim()) params.set("q", search.trim())

      fetch(`/api/admin/leads?${params.toString()}`, {
        signal: controller.signal,
      })
        .then(async (response) => {
          const body = (await response.json()) as {
            ok: boolean
            leads?: LeadRecord[]
            error?: string
          }
          if (!body.ok) throw new Error(body.error ?? "Could not load leads.")
          setLeads(body.leads ?? [])
          setError(null)
        })
        .catch((cause) => {
          if (cause instanceof Error && cause.name === "AbortError") return
          setError(cause instanceof Error ? cause.message : "Could not load leads.")
        })
    }, 250)

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [status, search])

  function changeStatus(id: string, next: LeadStatus) {
    const previous = leads
    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, status: next } : lead)),
    )
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/leads/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: next }),
        })
        const body = (await response.json()) as { ok: boolean; error?: string }
        if (!body.ok) throw new Error(body.error ?? "Update failed.")
        setError(null)
      } catch (cause) {
        setLeads(previous)
        setError(cause instanceof Error ? cause.message : "Update failed.")
      }
    })
  }

  function remove(id: string) {
    if (!window.confirm("Delete this lead permanently? This cannot be undone.")) {
      return
    }
    const previous = leads
    setLeads((current) => current.filter((lead) => lead.id !== id))
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" })
        const body = (await response.json()) as { ok: boolean; error?: string }
        if (!body.ok) throw new Error(body.error ?? "Delete failed.")
        setError(null)
      } catch (cause) {
        setLeads(previous)
        setError(cause instanceof Error ? cause.message : "Delete failed.")
      }
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, email, company or website"
            aria-label="Search leads"
            className="w-full rounded-lg border border-input bg-background/60 py-2.5 pl-9 pr-3.5 text-sm transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Filter by status"
          className="rounded-lg border border-input bg-background/60 px-3.5 py-2.5 text-sm transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All statuses</option>
          {leadStatuses.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {isPending && (
          <Loader2 aria-hidden className="size-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {error && (
        <p
          role="status"
          className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm"
        >
          {error}
        </p>
      )}

      {leads.length === 0 ? (
        <p className="rounded-2xl border border-border bg-card/40 px-5 py-10 text-center text-sm text-muted-foreground">
          No leads match this view.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-border/60 overflow-hidden rounded-2xl border border-border bg-card/40">
          {leads.map((lead) => {
            const isOpen = expanded === lead.id
            return (
              <li key={lead.id} className="flex flex-col">
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : lead.id)}
                    aria-expanded={isOpen}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">
                        {lead.name ?? lead.email}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {lead.company ? `${lead.company} · ` : ""}
                        {formatDate(lead.created_at)}
                        {lead.notification_status === "failed"
                          ? " · email not sent"
                          : ""}
                      </span>
                    </span>
                  </button>

                  <div className="flex items-center gap-2 pl-7 sm:pl-0">
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-xs",
                        statusTone[lead.status],
                      )}
                    >
                      {lead.status}
                    </span>
                    <select
                      value={lead.status}
                      onChange={(event) =>
                        changeStatus(lead.id, event.target.value as LeadStatus)
                      }
                      aria-label={`Status for ${lead.email}`}
                      className="rounded-lg border border-input bg-background/60 px-2 py-1.5 text-xs focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {leadStatuses.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => remove(lead.id)}
                      aria-label={`Delete lead from ${lead.email}`}
                      className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <dl className="grid gap-x-6 gap-y-3 border-t border-border/60 bg-background/40 p-4 text-sm sm:grid-cols-2 sm:p-5">
                    {(
                      [
                        ["Email", lead.email],
                        ["Phone", lead.phone],
                        ["Company", lead.company],
                        ["Website", lead.website],
                        ["Service", lead.service],
                        ["Budget", lead.budget],
                        ["Source", lead.source],
                        ["Notification", lead.notification_status],
                      ] as [string, string | null][]
                    )
                      .filter(([, value]) => Boolean(value))
                      .map(([label, value]) => (
                        <div key={label} className="flex flex-col gap-0.5">
                          <dt className="text-xs text-muted-foreground">{label}</dt>
                          <dd className="break-words">
                            {label === "Email" ? (
                              <a
                                href={`mailto:${value}`}
                                className="underline decoration-primary/40 underline-offset-2 hover:text-primary"
                              >
                                {value}
                              </a>
                            ) : label === "Website" ? (
                              <a
                                href={value as string}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="underline decoration-primary/40 underline-offset-2 hover:text-primary"
                              >
                                {value}
                              </a>
                            ) : (
                              value
                            )}
                          </dd>
                        </div>
                      ))}
                    {lead.message && (
                      <div className="flex flex-col gap-1 sm:col-span-2">
                        <dt className="text-xs text-muted-foreground">Message</dt>
                        <dd className="whitespace-pre-wrap leading-relaxed">
                          {lead.message}
                        </dd>
                      </div>
                    )}
                  </dl>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
