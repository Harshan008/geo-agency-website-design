export function GlowField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="glow-orb glow-orb-1 -left-32 -top-32 size-[480px]" />
      <div className="glow-orb glow-orb-2 -right-24 top-1/3 size-[420px]" />
      <div className="glow-orb glow-orb-3 bottom-0 left-1/3 size-[440px]" />
    </div>
  )
}
