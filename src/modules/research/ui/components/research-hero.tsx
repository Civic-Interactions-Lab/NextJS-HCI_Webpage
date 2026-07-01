"use client";

import { useRef } from "react";
import ResearchHeroLogo from "@/modules/research/ui/components/research-hero-logo";
import { useStaggerFade } from "@/modules/research/hooks/use-stagger-fade";

const ResearchHero = () => {
  const ref = useRef<HTMLDivElement>(null);

  useStaggerFade(ref, ".hero-line", { y: 40, duration: 0.8, trigger: ref });

  return (
    <section
      ref={ref}
      aria-label="Temple HCI Lab research overview"
      className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 overflow-hidden"
    >
      {/* Left: label + title + body */}
      <div className="flex flex-col gap-4 flex-1">
        <p className="hero-line font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
          Temple HCI Lab Research
        </p>
        <h2 className="hero-line font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-thunder leading-tight">
          Human. Technology. <span className="text-well-red">Impact.</span>
        </h2>
        <p className="hero-line text-p1 text-thunder/70 leading-relaxed">
          <span className="font-semibold text-thunder">
            Here at the Temple HCI Lab,
          </span>{" "}
          we study how people learn, communicate, and collaborate with
          technology. Our work brings together perspectives from human-computer
          interaction, communication, learning sciences, and participatory
          design to address real-world challenges in education, accessibility,
          and artificial intelligence. We take a pragmatic approach to
          technology — rather than viewing AI and emerging technologies as
          inherently beneficial or harmful, we seek to understand how their
          design shapes human experiences, relationships, and opportunities.
        </p>
        <p className="hero-line text-p1 text-thunder/70 leading-relaxed">
          We believe technology should be evaluated not only by what it can do, but
          by how it affects the people and communities who use it. We are
          especially sensitive to uncovering the potential harms of AI systems
          such as social displacement and disruptions to metacognitive
          processes.
        </p>
      </div>

      {/* Right: interactive logo */}
      <div className="w-full lg:w-[360px] shrink-0">
        <ResearchHeroLogo />
      </div>
    </section>
  );
};

export default ResearchHero;
