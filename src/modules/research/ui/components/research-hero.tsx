"use client";

import { useRef } from "react";
import { useStaggerFade } from "@/modules/research/hooks/use-stagger-fade";

interface ParagraphLine {
  content: React.ReactNode;
  className?: string;
}

interface ResearchHeroProps {
  ariaLabel: string;
  title: React.ReactNode;
  paragraphs: ParagraphLine[];
  logo: React.ReactNode;
}

/** Shared two-column hero layout used by the research overview page and each
 * research topic page — title/body/logo differ, the reveal animation and
 * structure don't. */
const ResearchHero = ({ ariaLabel, title, paragraphs, logo }: ResearchHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useStaggerFade(ref, ".hero-line", { y: 40, duration: 0.8, trigger: ref });

  return (
    <section
      ref={ref}
      aria-label={ariaLabel}
      className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 overflow-hidden"
    >
      {/* Left: label + title + body */}
      <div className="flex flex-col gap-4 flex-1">
        <p className="hero-line font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
          Temple HCI Lab Research
        </p>
        <h2 className="hero-line font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-thunder leading-tight">
          {title}
        </h2>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={`hero-line text-p1 leading-relaxed ${p.className ?? "text-thunder/70"}`}
          >
            {p.content}
          </p>
        ))}
      </div>

      {/* Right: topic-specific animated logo */}
      <div className="w-full lg:w-[360px] shrink-0">{logo}</div>
    </section>
  );
};

export default ResearchHero;
