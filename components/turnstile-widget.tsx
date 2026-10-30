"use client"

import { useEffect, useRef } from "react"

const scriptSrc = "https://challenges.cloudflare.com/turnstile/v0/api.js"

type Turnstile = {
  render: (
    container: HTMLElement,
    options: { sitekey: string; theme?: string; action?: string },
  ) => string
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: Turnstile
  }
}

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${scriptSrc}"]`,
  )
  if (existing) {
    return new Promise((resolve) => {
      existing.addEventListener("load", () => resolve(), { once: true })
      if (window.turnstile) resolve()
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = scriptSrc
    script.async = true
    script.defer = true
    script.addEventListener("load", () => resolve(), { once: true })
    script.addEventListener("error", () => reject(new Error("load failed")), {
      once: true,
    })
    document.head.appendChild(script)
  })
}

// Renders nothing when no site key is configured, so the form keeps working
// before Turnstile is set up. A Turnstile site key is public by design, so it
// is safe to inline from a NEXT_PUBLIC_* build-time variable.
export function TurnstileWidget({
  siteKey: siteKeyProp,
  action,
}: {
  siteKey?: string | null
  action?: string
}) {
  const siteKey = siteKeyProp ?? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? null
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!siteKey || !container.current) return

    // The production widget is registered for the live domain only, so on a
    // local dev server Turnstile refuses to start and Vite's error overlay
    // fires. Skipping it here has no effect on the deployed site.
    if (["localhost", "127.0.0.1"].includes(window.location.hostname)) return

    let widgetId: string | undefined
    let cancelled = false

    loadScript()
      .then(() => {
        if (cancelled || !container.current || !window.turnstile) return
        widgetId = window.turnstile.render(container.current, {
          sitekey: siteKey,
          theme: "auto",
          action,
        })
      })
      .catch(() => {
        // Offline or blocked: the server treats a missing token as a failed
        // challenge only when Turnstile itself rejects it.
      })

    return () => {
      cancelled = true
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
    }
  }, [siteKey, action])

  if (!siteKey) return null

  return <div ref={container} className="min-h-[65px]" />
}
