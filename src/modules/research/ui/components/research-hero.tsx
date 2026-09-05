"use client";

import { useRef } from "react";
import { useStaggerFade } from "@/modules/research/hooks/use-stagger-fade";
import { RESEARCH_CATEGORIES } from "@/modules/research/constants/research-categories";
import ResearchHeroLogo from "@/modules/research/ui/components/research-hero-logo";
import TopicLogoGenAI from "@/modules/research/ui/components/topic-logo-gen-ai";
import TopicLogoAccessibility from "@/modules/research/ui/components/topic-logo-accessibility";
import TopicLogoSocial from "@/modules/research/ui/components/topic-logo-social";

export type ResearchTopicLabel =
  | "Gen AI & Education"
  | "Accessibility Technology"
  | "Future of Work";

export type ResearchHeroVariant = "overview" | ResearchTopicLabel;

const ResearchOverviewHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  useStaggerFade(ref, ".hero-line", { y: 40, duration: 0.8, trigger: ref });

  return (
    <section
      ref={ref}
      aria-label="Temple HCI Lab research overview"
      className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 overflow-hidden"
    >
      <div className="flex flex-col gap-4 flex-1">
        <p className="hero-line font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
          Temple HCI Lab Research
        </p>
        <h2 className="hero-line font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-thunder leading-tight">
          Human. Technology. <span className="text-well-red">Impact.</span>
        </h2>
        <p className="hero-line text-p1 leading-relaxed text-thunder/70">
          <span className="font-semibold text-thunder">
            Here at the Temple HCI Lab,
          </span>{" "}
          we study how people learn, communicate, and collaborate with
          technology. Our work brings together perspectives from
          human-computer interaction, communication, learning sciences, and
          participatory design to address real-world challenges in education,
          accessibility, and artificial intelligence. We take a pragmatic
          approach to technology — rather than viewing AI and emerging
          technologies as inherently beneficial or harmful, we seek to
          understand how their design shapes human experiences,
          relationships, and opportunities.
        </p>
        <p className="hero-line text-p1 leading-relaxed text-thunder/70">
          We believe technology should be evaluated not only by what it can
          do, but by how it affects the people and communities who use it. We
          are especially sensitive to uncovering the potential harms of AI
          systems such as social displacement and disruptions to
          metacognitive processes.
        </p>
      </div>

      <div className="w-full lg:w-[360px] shrink-0">
        <ResearchHeroLogo />
      </div>
    </section>
  );
};

const ResearchGenAIHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  useStaggerFade(ref, ".hero-line", { y: 40, duration: 0.8, trigger: ref });
  const cat = RESEARCH_CATEGORIES.find((c) => c.label === "Gen AI & Education")!;

  return (
    <section
      ref={ref}
      aria-label="Gen AI & Education research at the Temple HCI Lab"
      className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 overflow-hidden"
    >
      <div className="flex flex-col gap-4 flex-1">
        <p className="hero-line font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
          Temple HCI Lab Research
        </p>
        <h2 className="hero-line font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-thunder leading-tight">
          Gen AI & <span className="text-well-red">Education</span>
        </h2>
        <p className="hero-line text-p1 leading-relaxed text-thunder/60 italic">
          &ldquo;{cat.tagline}&rdquo;
        </p>
        <p className="hero-line text-p1 leading-relaxed text-thunder/70">
          {cat.description}
        </p>
      </div>

      <div className="w-full lg:w-[360px] shrink-0">
        <TopicLogoGenAI />
      </div>
    </section>
  );
};

const ResearchAccessibilityHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  useStaggerFade(ref, ".hero-line", { y: 40, duration: 0.8, trigger: ref });
  const cat = RESEARCH_CATEGORIES.find((c) => c.label === "Accessibility Technology")!;

  return (
    <section
      ref={ref}
      aria-label="Accessibility Technology research at the Temple HCI Lab"
      className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 overflow-hidden"
    >
      <div className="flex flex-col gap-4 flex-1">
        <p className="hero-line font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
          Temple HCI Lab Research
        </p>
        <h2 className="hero-line font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-thunder leading-tight">
          Accessibility <span className="text-well-red">Technology</span>
        </h2>
        <p className="hero-line text-p1 leading-relaxed text-thunder/60 italic">
          &ldquo;{cat.tagline}&rdquo;
        </p>
        <p className="hero-line text-p1 leading-relaxed text-thunder/70">
          {cat.description}
        </p>
      </div>

      <div className="w-full lg:w-[360px] shrink-0">
        <TopicLogoAccessibility />
      </div>
    </section>
  );
};

const ResearchFutureOfWorkHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  useStaggerFade(ref, ".hero-line", { y: 40, duration: 0.8, trigger: ref });
  const cat = RESEARCH_CATEGORIES.find((c) => c.label === "Future of Work")!;

  return (
    <section
      ref={ref}
      aria-label="Future of Work research at the Temple HCI Lab"
      className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 overflow-hidden"
    >
      <div className="flex flex-col gap-4 flex-1">
        <p className="hero-line font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
          Temple HCI Lab Research
        </p>
        <h2 className="hero-line font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-thunder leading-tight">
          Future of <span className="text-well-red">Work</span>
        </h2>
        <p className="hero-line text-p1 leading-relaxed text-thunder/60 italic">
          &ldquo;{cat.tagline}&rdquo;
        </p>
        <p className="hero-line text-p1 leading-relaxed text-thunder/70">
          {cat.description}
        </p>
      </div>

      <div className="w-full lg:w-[360px] shrink-0">
        <TopicLogoSocial />
      </div>
    </section>
  );
};

interface ResearchHeroProps {
  variant: ResearchHeroVariant;
}

const ResearchHero = ({ variant }: ResearchHeroProps) => {
  switch (variant) {
    case "overview":
      return <ResearchOverviewHero />;
    case "Gen AI & Education":
      return <ResearchGenAIHero />;
    case "Accessibility Technology":
      return <ResearchAccessibilityHero />;
    case "Future of Work":
      return <ResearchFutureOfWorkHero />;
  }
};

export default ResearchHero;
