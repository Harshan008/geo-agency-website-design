import { founder } from "@/lib/site"
import { cn } from "@/lib/utils"

// === SOCIAL LINKS ===
// Profiles come from `founder.profiles` in lib/site.ts — edit them there.
// Icons are inline SVG because lucide-react no longer ships brand marks.
const icons: Record<string, React.ReactNode> = {
  LinkedIn: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  ),
  X: (
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
  ),
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)} aria-label="Social profiles">
      {founder.profiles.map((profile) => (
        <li key={profile.label}>
          <a
            href={profile.url}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={`${founder.name} on ${profile.label} (opens in a new tab)`}
            className="glow-interactive inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
              {icons[profile.label]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
