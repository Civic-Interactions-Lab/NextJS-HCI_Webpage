"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CommunityResearch from "@/modules/about/ui/components/community-research";
import StudioTime from "@/modules/about/ui/components/studio-time";
import Leadership from "@/modules/about/ui/components/leadership";
import LearningOutcomes from "@/modules/about/ui/components/learning-outcomes";
import LabValues from "@/modules/about/ui/components/lab-values";

gsap.registerPlugin(ScrollTrigger);

const AboutView = () => {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(introRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: introRef.current, start: "top 90%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="space-y-20">
      {/* Intro */}
      <div ref={introRef} className="flex gap-6 border-l-4 border-well-red pl-6 py-2">
        <p className="text-p1 text-thunder/80 leading-relaxed max-w-3xl">
          <span className="label-4 text-well-red uppercase">THE Temple HCI Lab</span>{" "}
          is the largest undergraduate research lab at Temple University. Located in the College
          of Science and Technology (CST) within the Department of Computer and Information Sciences,
          the lab brings together students from computer science, psychology, education, and design
          to study technology, learning, and human-centered computing.
        </p>
      </div>

      <CommunityResearch />
      <StudioTime />
      <Leadership />
      <LearningOutcomes />
      <LabValues />
    </div>
  );
};

export default AboutView;
