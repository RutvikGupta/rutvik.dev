"use client";

import { useEffect, useState } from "react";

/**
 * Lyra — Spotify listening → 3D force-directed graph.
 *
 * 2D projection of the constellation idea: 14 nodes in three loose
 * genre-clusters with thin connecting edges (intra-cluster dense,
 * inter-cluster sparse — like community detection produces). Each node
 * breathes on its own slightly-staggered loop. One "now-playing" node
 * carries a brighter fill plus an expanding halo ripple, and the
 * highlighted node hops to a different cluster every ~5 s — the same
 * way the live-track halo moves around the real graph.
 */

type Node = { x: number; y: number; cluster: 0 | 1 | 2 };

const NODES: Node[] = [
  // cluster 0 — top-left
  { x: 50,  y: 56,  cluster: 0 },
  { x: 88,  y: 80,  cluster: 0 },
  { x: 60,  y: 110, cluster: 0 },
  { x: 100, y: 130, cluster: 0 },
  // cluster 1 — center
  { x: 144, y: 64,  cluster: 1 },
  { x: 168, y: 100, cluster: 1 },
  { x: 138, y: 132, cluster: 1 },
  { x: 180, y: 148, cluster: 1 },
  { x: 196, y: 76,  cluster: 1 },
  // cluster 2 — right
  { x: 232, y: 54,  cluster: 2 },
  { x: 264, y: 88,  cluster: 2 },
  { x: 246, y: 120, cluster: 2 },
  { x: 280, y: 140, cluster: 2 },
  { x: 218, y: 110, cluster: 2 },
];

// Edge index pairs. Dense within clusters, two thin bridges across.
const EDGES: Array<[number, number]> = [
  // cluster 0
  [0, 1], [1, 2], [2, 3], [1, 3], [0, 2],
  // cluster 1
  [4, 5], [5, 6], [5, 8], [6, 7], [4, 8], [5, 7],
  // cluster 2
  [9, 10], [10, 11], [11, 12], [9, 13], [10, 13], [11, 13],
  // bridges
  [3, 6], [8, 9], [13, 6],
];

// Warm-pink → peach → soft-violet trio. Distinct from every other
// preview accent and reads as "music / cosmos" rather than literal
// Spotify green.
const CLUSTER_COLORS = [
  "rgba(232,141,196,0.92)",  // warm pink
  "rgba(255,176,136,0.92)",  // peach
  "rgba(184,140,255,0.92)",  // soft violet
];

const HALO_CYCLE_MS = 5400;

export function LyraPreview() {
  const [livingIndex, setLivingIndex] = useState(0);

  // Hop the now-playing halo to a different node every cycle. We
  // intentionally pick a node from a *different* cluster than the
  // current one so the halo visibly traverses the graph rather than
  // staying in one corner.
  useEffect(() => {
    const tick = () => {
      setLivingIndex((prev) => {
        const currentCluster = NODES[prev].cluster;
        const candidates = NODES.map((n, i) => ({ n, i })).filter(
          ({ n, i }) => n.cluster !== currentCluster && i !== prev
        );
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        return pick.i;
      });
    };
    const id = window.setInterval(tick, HALO_CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  const living = NODES[livingIndex];
  const livingColor = CLUSTER_COLORS[living.cluster];

  return (
    <div className="preview-frame">
      <div className="preview-caption">
        <span>lyra · constellation</span>
        <span>now playing</span>
      </div>

      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* edges first so nodes sit on top */}
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.6"
          />
        ))}

        {/* nodes with staggered breathing */}
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i === livingIndex ? 3.2 : 2.4}
            fill={CLUSTER_COLORS[n.cluster]}
            data-preview-anim
            style={{
              transition: "r 600ms cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          >
            <animate
              attributeName="opacity"
              values="0.55;1;0.55"
              dur={`${3.4 + (i % 5) * 0.4}s`}
              begin={`${(i * 0.27) % 3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* now-playing halo — keyed on livingIndex so the ripple
            restarts when the highlighted node changes */}
        <g key={`halo-${livingIndex}`}>
          <circle
            cx={living.x}
            cy={living.y}
            r="4"
            fill="none"
            stroke={livingColor}
            strokeWidth="1.1"
            data-preview-anim
          >
            <animate
              attributeName="r"
              values="3.6;13;3.6"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.85;0;0.85"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx={living.x}
            cy={living.y}
            r="1.2"
            fill={livingColor}
            data-preview-anim
          >
            <animate
              attributeName="r"
              values="1;1.8;1"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}
