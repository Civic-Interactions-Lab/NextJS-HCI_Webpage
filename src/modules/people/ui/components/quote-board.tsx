"use client";

import { useEffect, useRef, useState } from "react";

const VW = 900;
const VH = 580;

const QUOTES = [
  { quote: "That's a Steve question.", name: "Literally Everyone", size: 22, opacity: 1.0 },
  { quote: "Where is your database?!", name: "Silas C", size: 20, opacity: 0.95 },
  { quote: "Smells like deceit!", name: "Kate O", size: 19, opacity: 1.0 },
  { quote: "…Battery Acid", name: "Kenny", size: 20, opacity: 0.95 },
  { quote: "Poetry", name: "Ashfin", size: 21, opacity: 0.9 },
  { quote: "I have acid!", name: "Kenny", size: 19, opacity: 0.9 },
  { quote: "It needs more salt", name: "Kate O", size: 18, opacity: 0.85 },
  { quote: "The council is deciding your fate… Lobotomy", name: "Kate O", size: 15, opacity: 0.88 },
  { quote: "Wait I'm goated, stay humble", name: "Emily Goat × Kate H", size: 16, opacity: 0.88 },
  { quote: "There were beans in the fountain?", name: "Emily", size: 16, opacity: 0.82 },
  { quote: "The day you meet Steve.", name: "Kush Patel", size: 15, opacity: 0.78 },
  { quote: "I miss the uncs :(", name: "Daniel B.", size: 15, opacity: 0.78 },
  { quote: "You look like young Zuc", name: "Mann", size: 15, opacity: 0.78 },
  { quote: "The potato is quality", name: "Kush", size: 15, opacity: 0.72 },
  { quote: "Thank you! Thank you! Thank you!", name: "Kush, Ashfin, Antonio", size: 14, opacity: 0.7 },
  { quote: "I'll whoop you in Jeans", name: "Thanh", size: 14, opacity: 0.68 },
  { quote: "Do you want to hang out… like socially?", name: "Nadia", size: 13, opacity: 0.68 },
  { quote: "I like your fan. I like you.", name: "Jess", size: 13, opacity: 0.62 },
  { quote: "Looks like a Cinnamon roll. Could kill you.", name: "Jess", size: 12, opacity: 0.62 },
  { quote: "Antonio's kind of like Obama in that way", name: "Emily M", size: 12, opacity: 0.62 },
  { quote: "Why is Egi kinda Kenny nowadays", name: "Danny", size: 12, opacity: 0.58 },
  { quote: "I can joke like that but you can't.", name: "Kate H", size: 12, opacity: 0.58 },
  { quote: "GOATS everywhere for those with eyes to see", name: "Emily Goat", size: 12, opacity: 0.62 },
  { quote: "Pigeons are sky rats, seagulls are beach rats,\nsquirrels are forest rats, bats are night rats.", name: "Kate O", size: 11, opacity: 0.65 },
  { quote: "Do you have any Traceable cultural background?", name: "Emily", size: 11, opacity: 0.52 },
  { quote: "If it's not in English, what language is it?", name: "Kate H", size: 11, opacity: 0.52 },
];

const COLORS = ["#AA2C45", "#AA2C45", "#8B1E35", "#2d2d2d", "#AA2C45", "#6b1428"];

type PlacedQuote = {
  x: number; y: number; w: number; h: number;
  qLines: string[]; nameStr: string;
  qs: number; ns: number; lh: number; nlh: number;
  color: string; opacity: number;
};

function computeLayout(): PlacedQuote[] {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  function mw(text: string, size: number, bold: boolean) {
    ctx.font = `${bold ? "bold" : "normal"} ${size}px Georgia, serif`;
    return ctx.measureText(text).width;
  }

  const placed: { x: number; y: number; w: number; h: number }[] = [];
  const result: PlacedQuote[] = [];
  const CX = VW / 2, CY = VH / 2;

  function overlaps(a: typeof placed[0], b: typeof placed[0]) {
    const pad = 14;
    return !(
      a.x + a.w / 2 + pad < b.x - b.w / 2 || a.x - a.w / 2 > b.x + b.w / 2 + pad ||
      a.y + a.h / 2 + pad < b.y - b.h / 2 || a.y - a.h / 2 > b.y + b.h / 2 + pad
    );
  }

  function fits(box: typeof placed[0]) {
    if (box.x - box.w / 2 < 6 || box.x + box.w / 2 > VW - 6) return false;
    if (box.y - box.h / 2 < 6 || box.y + box.h / 2 > VH - 6) return false;
    return !placed.some(p => overlaps(p, box));
  }

  [...QUOTES].sort((a, b) => b.size - a.size).forEach((q, i) => {
    const qs = q.size;
    const ns = Math.max(8, qs * 0.65);
    const lh = qs * 1.45;
    const nlh = ns * 1.3;
    const qLines = q.quote.split("\n");
    const quoted = qLines.map((l, li) =>
      (li === 0 ? "“" + l : l) + (li === qLines.length - 1 ? "”" : "")
    );
    const nameStr = "— " + q.name;

    const maxQW = Math.max(...quoted.map(l => mw(l, qs, true)));
    const nameW = mw(nameStr, ns, false);
    const totalW = Math.max(maxQW, nameW) + 6;
    const totalH = lh * qLines.length + nlh + 4;

    let box: typeof placed[0] | null = null;
    for (let r = 0; r < 1400; r += 0.65) {
      const theta = r * 0.33;
      const px = CX + r * Math.cos(theta);
      const py = CY + r * Math.sin(theta) * 0.56;
      const b = { x: px, y: py, w: totalW, h: totalH };
      if (fits(b)) { box = b; break; }
    }
    if (!box) return;
    placed.push(box);

    result.push({
      x: box.x, y: box.y, w: box.w, h: box.h,
      qLines: quoted, nameStr,
      qs, ns, lh, nlh,
      color: COLORS[i % COLORS.length],
      opacity: q.opacity,
    });
  });

  return result;
}

export default function LabQuotesCloud() {
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRefs = useRef<(SVGGElement | null)[]>([]);
  const [items, setItems] = useState<PlacedQuote[]>([]);
  const [ready, setReady] = useState(false);
  const animFrameRef = useRef<number>(0);
  const scalesRef = useRef<number[]>([]);
  const targetScalesRef = useRef<number[]>([]);

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const laid = computeLayout();
        setItems(laid);
        scalesRef.current = laid.map(() => 1);
        targetScalesRef.current = laid.map(() => 1);
        setReady(true);
      })
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!ready || items.length === 0) return;
    const svg = svgRef.current;
    if (!svg) return;

    const RADIUS = 130; // influence radius in viewBox units
    const MAX_SCALE = 1.28;

    function toSVGPoint(clientX: number, clientY: number) {
      const pt = svg!.createSVGPoint();
      pt.x = clientX; pt.y = clientY;
      const ctm = svg!.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      return pt.matrixTransform(ctm.inverse());
    }

    function onMouseMove(e: MouseEvent) {
      const { x: mx, y: my } = toSVGPoint(e.clientX, e.clientY);
      items.forEach((item, i) => {
        const dx = mx - item.x;
        const dy = my - item.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = Math.max(0, 1 - dist / RADIUS);
        targetScalesRef.current[i] = 1 + (MAX_SCALE - 1) * t * t;
      });
    }

    function onMouseLeave() {
      targetScalesRef.current = items.map(() => 1);
    }

    function animate() {
      const LERP = 0.12;
      let needsUpdate = false;
      scalesRef.current = scalesRef.current.map((s, i) => {
        const target = targetScalesRef.current[i] ?? 1;
        const next = s + (target - s) * LERP;
        if (Math.abs(next - s) > 0.0005) needsUpdate = true;
        return next;
      });

      if (needsUpdate) {
        scalesRef.current.forEach((scale, i) => {
          const g = groupRefs.current[i];
          if (!g) return;
          const item = items[i];
          g.setAttribute(
            "transform",
            `translate(${item.x},${item.y}) scale(${scale}) translate(${-item.x},${-item.y})`
          );
        });
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    svg.addEventListener("mousemove", onMouseMove);
    svg.addEventListener("mouseleave", onMouseLeave);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      svg.removeEventListener("mousemove", onMouseMove);
      svg.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [ready, items]);

  return (
    <div className="w-full">
      <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest mb-6">
        Quote Board
      </p>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        width="100%"
        height="auto"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s ease", cursor: "default" }}
      >
        {items.map((item, i) => {
          const topY = item.y - item.h / 2;
          return (
            <g
              key={i}
              ref={el => { groupRefs.current[i] = el; }}
              opacity={item.opacity}
            >
              {item.qLines.map((line, li) => (
                <text
                  key={li}
                  x={item.x}
                  y={topY + item.lh * (li + 0.5)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={item.qs}
                  fontFamily="Georgia, serif"
                  fontWeight="bold"
                  fontStyle="italic"
                  fill={item.color}
                >
                  {line}
                </text>
              ))}
              <text
                x={item.x}
                y={topY + item.lh * item.qLines.length + item.nlh * 0.5}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={item.ns}
                fontFamily="var(--font-outfit), sans-serif"
                fontWeight="600"
                fill={item.color}
                opacity={0.65}
              >
                {item.nameStr}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
