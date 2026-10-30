"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

// IntersectionObserver-based reveal — works in every browser, unlike the
// CSS `animation-timeline: view()` this replaces (Safari doesn't run it).
// Toggling on every intersection change, not just the first one, is what
// makes it replay on the way back up, not just the way down.
// Spring-shaped easing via CSS linear(): a slight overshoot that settles, and
// reverses smoothly if the element leaves view mid-animation. Browsers without
// linear() ignore the inline value and fall back to the class's ease-out.
const SPRING =
  "linear(0, 0.009, 0.035 2.1%, 0.141, 0.281 6.7%, 0.723 12.9%, 0.938 16.7%, 1.017, 1.077, 1.121, 1.149 24.3%, 1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%, 1.051 39.6%, 1.017 43.1%, 0.991, 0.977 51%, 0.974 53.8%, 0.975 57.1%, 0.997 69.8%, 1.003 76.9%, 1.004 83.8%, 1)"

export function ScrollReveal({
  as: As = "div",
  className,
  delay = 0,
  children,
}: {
  as?: ElementType
  className?: string
  /** Milliseconds to wait before revealing — use i * 70 to stagger a list. */
  delay?: number
  children: ReactNode
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <As
      ref={ref}
      style={{
        transitionTimingFunction: SPRING,
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        className,
      )}
    >
      {children}
    </As>
  )
}
