import { cn } from "@/lib/utils";

const NODES = [
  [60, 90], [210, 200], [120, 340], [300, 420], [240, 60], [390, 150],
  [1140, 110], [990, 210], [1090, 350], [900, 440], [960, 60], [810, 150],
] as const;

const EDGES = [
  [0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [1, 5], [3, 5],
  [6, 7], [7, 8], [8, 9], [7, 10], [10, 11], [7, 11], [9, 11],
] as const;

interface Props {
  className?: string;
  /** "right" dibuja solo la mitad derecha, para heros con el texto a la izquierda. */
  side?: "both" | "right";
}

/** Red de nodos decorativa. Se dibuja una sola vez al cargar (ver globals.css). */
export function NetworkBackdrop({ className, side = "both" }: Props) {
  const firstNode = side === "right" ? 6 : 0;
  const edges = EDGES.filter(([from]) => from >= firstNode);
  const nodes = NODES.map((node, index) => ({ node, index })).filter(({ index }) => index >= firstNode);

  return (
    <svg
      viewBox={side === "right" ? "640 0 560 520" : "0 0 1200 520"}
      preserveAspectRatio={side === "right" ? "xMaxYMid slice" : "xMidYMid slice"}
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        {edges.map(([from, to], i) => (
          <path
            key={`${from}-${to}`}
            className="network-line"
            pathLength={1}
            d={`M${NODES[from][0]} ${NODES[from][1]}L${NODES[to][0]} ${NODES[to][1]}`}
            style={{ "--d": `${i * 0.12}s` } as React.CSSProperties}
          />
        ))}
      </g>
      <g fill="currentColor">
        {nodes.map(({ node: [x, y], index }, i) => (
          <circle
            key={index}
            className="network-node"
            cx={x}
            cy={y}
            r={index % 3 === 0 ? 7 : 5}
            style={{ "--d": `${0.3 + i * 0.1}s` } as React.CSSProperties}
          />
        ))}
      </g>
    </svg>
  );
}
