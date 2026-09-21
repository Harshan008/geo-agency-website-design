import { cn } from "@/lib/utils"

const nodes = [
  { cx: 200, cy: 200, r: 5, lit: true },
  { cx: 90, cy: 120, r: 3 },
  { cx: 320, cy: 110, r: 3.5, lit: true },
  { cx: 340, cy: 250, r: 3 },
  { cx: 250, cy: 330, r: 3.5, lit: true },
  { cx: 110, cy: 300, r: 3 },
  { cx: 60, cy: 220, r: 2.5 },
  { cx: 300, cy: 190, r: 2.5 },
  { cx: 170, cy: 70, r: 2.5, lit: true },
  { cx: 250, cy: 150, r: 2.5 },
  { cx: 150, cy: 250, r: 2.5 },
]

const edges: [number, number][] = [
  [0, 2], [0, 3], [0, 4], [0, 5], [0, 7], [0, 9], [0, 10],
  [1, 8], [1, 6], [2, 8], [2, 9], [3, 7], [4, 10], [5, 6],
]

export function KnowledgeGraph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Illustration of a knowledge graph connecting entities"
      className={cn("h-full w-full", className)}
    >
      <g stroke="oklch(0.81 0.12 82 / 0.35)" strokeWidth="0.75">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].cx}
            y1={nodes[a].cy}
            x2={nodes[b].cx}
            y2={nodes[b].cy}
          />
        ))}
      </g>
      <g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill={n.lit ? "oklch(0.86 0.12 82)" : "oklch(0.7 0.05 80 / 0.6)"}
          />
        ))}
      </g>
    </svg>
  )
}
