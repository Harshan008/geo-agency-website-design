const nodes = [
  { x: 10, y: 12 },
  { x: 32, y: 6 },
  { x: 58, y: 18 },
  { x: 82, y: 10 },
  { x: 14, y: 42 },
  { x: 44, y: 48 },
  { x: 68, y: 44 },
  { x: 90, y: 52 },
  { x: 22, y: 74 },
  { x: 52, y: 78 },
  { x: 78, y: 82 },
  { x: 38, y: 94 },
]

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
  [4, 8],
  [5, 9],
  [6, 10],
  [8, 11],
  [9, 11],
]

/**
 * A faint knowledge-graph that draws itself in as the page scrolls — nodes
 * appear and lines connect them, echoing "engines build an entity graph of
 * you" as the visitor moves through the evidence for it.
 */
export function CitationGraph() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {edges.map(([a, b], i) => {
        const from = nodes[a]
        const to = nodes[b]
        const start = (i / edges.length) * 75
        const end = start + 28
        return (
          <line
            key={`edge-${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            className="citation-line"
            style={{ animationRange: `${start}% ${end}%` }}
          />
        )
      })}
      {nodes.map((n, i) => {
        const start = (i / nodes.length) * 75
        const end = start + 18
        return (
          <circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r={1.1}
            className="citation-node"
            style={{ animationRange: `${start}% ${end}%` }}
          />
        )
      })}
    </svg>
  )
}
