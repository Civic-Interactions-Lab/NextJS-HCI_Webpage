"use client";

import { useRef } from "react";
import { SectionTitle } from "@/components/section-title";
import { COMMUNITY_RESEARCH_STATS } from "@/modules/about/constants";
import { useFadeReveal, useStaggerReveal } from "@/modules/about/hooks/use-scroll-reveal";

const CommunityResearch = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useFadeReveal(rootRef, textRef, { y: 40, duration: 0.6, trigger: textRef });
  useStaggerReveal(rootRef, ".stat-item", { y: 24, duration: 0.5, trigger: statsRef });

  return (
    <section ref={rootRef} className="flex flex-col gap-6">
      <div ref={textRef} className="flex flex-col gap-4">
        <SectionTitle>Community Research</SectionTitle>
        <p className="text-p1 text-thunder/75 leading-relaxed max-w-2xl">
          Our lab takes a community-centered approach where students
          collaborate, share ideas, and learn from each other. Together, they
          explore real-world questions, build research skills, and create
          meaningful, collective solutions.
        </p>
      </div>

      <div ref={statsRef} className="grid grid-cols-2 gap-4">
        {COMMUNITY_RESEARCH_STATS.map(({ number, desc }) => (
          <div
            key={number}
            className="stat-item flex flex-col gap-2 p-5 rounded-2xl"
          >
            <span className="font-outfit font-bold text-5xl text-well-red leading-none">
              {number}
            </span>
            <p className="text-p2 text-thunder/70 leading-snug">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityResearch;
