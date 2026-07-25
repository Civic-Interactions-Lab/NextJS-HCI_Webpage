"use client";

import { useRef } from "react";
import { SectionTitle } from "@/components/section-title";
import { LEARNING_OUTCOMES } from "@/modules/about/constants";
import { useStaggerReveal } from "@/modules/about/hooks/use-scroll-reveal";

const LearningOutcomes = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(rootRef, ".outcome-card");

  return (
    <section ref={rootRef} className="-mx-6 md:-mx-12 px-6 md:px-12 bg-alabaster">
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
