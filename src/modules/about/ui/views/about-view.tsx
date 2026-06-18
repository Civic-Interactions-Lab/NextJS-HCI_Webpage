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
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 90%",
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="space-y-20 overflow-x-hidden">
      {/* Intro + Community Research alongside vertical video */}
      <div
        ref={introRef}
        className="flex flex-col md:flex-row gap-10 md:gap-16 items-start"
      >
        {/* Left col: intro text + community research */}
        <div className="flex-1 flex flex-col gap-12">
          <div className="border-l-4 border-well-red pl-6 py-2">
            <p className="text-p1 text-thunder/80 leading-relaxed">
              <span className="label-4 text-well-red uppercase">
                THE Temple HCI Lab
              </span>{" "}
              is the largest undergraduate research lab at Temple University.
              Located in the College of Science and Technology (CST) within the
              Department of Computer and Information Sciences, the lab brings
              together students from computer science, psychology, education,
              and design to study technology, learning, and human-centered
              computing.
            </p>
          </div>

          <CommunityResearch />
        </div>

        {/* Right col: vertical video */}
        <div className="flex justify-center w-full md:w-auto shrink-0">
          <div className="relative aspect-9/16 w-[220px] md:w-[300px] rounded-2xl overflow-hidden shadow-xl">
            <video
              src="/videos/hci.mov"
              className="w-full h-full object-cover"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </div>

      <StudioTime />
      <Leadership />
      <LearningOutcomes />
      <LabValues />
    </div>
  );
};

export default AboutView;
