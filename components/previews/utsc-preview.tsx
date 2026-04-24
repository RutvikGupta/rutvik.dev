"use client";

/**
 * UTSC CAP Lab — neural-network framework for cognitive modelling.
 *
 * 3-layer feedforward net. Pulses travel the full depth: they go along an
 * input→hidden edge, pause at the hidden node, then continue along a
 * hidden→output edge so the animation visibly passes all the way through.
 */

const layers = [
  { x: 64,  ys: [60, 100, 140] },             // input
  { x: 160, ys: [48, 88, 128, 168] },          // hidden
  { x: 256, ys: [78, 122] },                   // output
];

type Edge = { from: [number, number]; to: [number, number] };

function buildEdges(a: { x: number; ys: number[] }, b: { x: number; ys: number[] }) {
  const out: Edge[] = [];
  for (const fy of a.ys) for (const ty of b.ys) out.push({ from: [a.x, fy], to: [b.x, ty] });
  return out;
}

const edgesInputHidden = buildEdges(layers[0], layers[1]);
const edgesHiddenOutput = buildEdges(layers[1], layers[2]);
const allEdges = [...edgesInputHidden, ...edgesHiddenOutput];

// A "trace" = one full input→hidden→output path, built by stitching two
// edges that share a hidden node. We pick five traces that together exercise
// most of the network.
const traces: Array<{ a: Edge; b: Edge; delay: number }> = [
  // input0 → hidden0 → output0
  { a: edgesInputHidden[0],  b: edgesHiddenOutput[0],  delay: 0 },
  // input1 → hidden1 → output1
  { a: edgesInputHidden[5],  b: edgesHiddenOutput[3],  delay: 0.6 },
  // input2 → hidden3 → output1
  { a: edgesInputHidden[11], b: edgesHiddenOutput[7],  delay: 1.2 },
  // input0 → hidden2 → output0
  { a: edgesInputHidden[2],  b: edgesHiddenOutput[4],  delay: 1.8 },
  // input2 → hidden1 → output0
  { a: edgesInputHidden[9],  b: edgesHiddenOutput[2],  delay: 2.4 },
];

function pathFor(trace: { a: Edge; b: Edge }) {
  const [ax, ay] = trace.a.from;
  const [mx, my] = trace.a.to;
  const [bx, by] = trace.b.to;
  return `M${ax},${ay} L${mx},${my} L${bx},${by}`;
}

export function UTSCPreview() {
  return (
    <div className="preview-frame">
      <div className="preview-caption">
        <span>cap lab · train</span>
        <span>3-layer net</span>
      </div>

      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* static edges */}
        {allEdges.map((e, i) => (
          <line
            key={i}
            x1={e.from[0]}
            y1={e.from[1]}
            x2={e.to[0]}
            y2={e.to[1]}
            stroke="rgba(167,139,196,0.2)"
            strokeWidth="0.8"
          />
        ))}

        {/* animated signal pulses that traverse input → hidden → output */}
        {traces.map((t, i) => (
          <circle
            key={`p-${i}`}
            r="2.4"
            fill="rgba(206,178,232,1)"
            data-preview-anim
          >
            <animateMotion
              path={pathFor(t)}
              dur="3.6s"
              begin={`${t.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;1;0"
              keyTimes="0;0.06;0.48;0.92;1"
              dur="3.6s"
              begin={`${t.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* nodes (drawn after the pulses so they sit on top) */}
        {layers.map((layer, li) =>
          layer.ys.map((y) => (
            <g key={`${li}-${y}`}>
              <circle
                cx={layer.x}
                cy={y}
                r="7.5"
                fill="rgba(12,10,18,0.95)"
                stroke="rgba(167,139,196,0.55)"
                strokeWidth="1.15"
              />
              <circle
                cx={layer.x}
                cy={y}
                r="2.8"
                fill="rgba(206,178,232,0.9)"
                data-preview-anim
              >
                <animate
                  attributeName="opacity"
                  values="0.45;1;0.45"
                  dur="3.2s"
                  begin={`${li * 0.35 + y * 0.01}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))
        )}
      </svg>

      <div className="preview-caption preview-caption-bottom">
        <span>input · hidden · output</span>
        <span>numpy · pandas</span>
      </div>
    </div>
  );
}
