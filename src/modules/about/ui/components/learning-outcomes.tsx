"use client";

import { useRef } from "react";
import { SectionTitle } from "@/components/section-title";
import { useStaggerReveal } from "@/modules/about/hooks/use-scroll-reveal";

const LEARNING_OUTCOMES = [
  {
    id: 1,
    category: "DESIGN",
    description: "Think critically, collaborate with others, and communicate complex ideas simply.",
    badgeColor: "bg-sky",
    radius: "rounded-tl-2xl rounded-br-2xl",
  },
  {
    id: 2,
    category: "LEAD",
    description: "Learn to tackle large systemic problems by taking risks and make consequential decisions.",
    badgeColor: "bg-grass",
    radius: "rounded-xl",
  },
  {
    id: 3,
    category: "CREATE",
    description: "Apply AI, ML, Web Dev, and Software Engineering skills on real projects used by real people.",
    badgeColor: "bg-gold",
    radius: "rounded-tr-2xl rounded-bl-2xl",
  },
];

const LearningOutcomes = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(rootRef, ".outcome-card");

  return (
    <section ref={rootRef} className="-mx-6 md:-mx-12 px-6 md:px-12">
      <div className="flex flex-col gap-10 max-w-7xl">
        <SectionTitle>Learning Outcomes</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {LEARNING_OUTCOMES.map((outcome) => (
            <div
              key={outcome.id}
              className={`outcome-card flex flex-col gap-3 p-6 bg-white border border-thunder/8 shadow-sm ${outcome.radius}`}
            >
              <span className={`font-outfit text-xs font-bold uppercase tracking-wide text-white px-4 py-1.5 w-fit ${outcome.badgeColor} ${outcome.radius}`}>
                {outcome.category}
              </span>
              <p className="text-p1 text-thunder/75 leading-relaxed">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
