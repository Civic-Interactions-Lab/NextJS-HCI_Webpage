"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/section-title";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: "77", desc: "undergraduate students have been an author on peer-reviewed work." },
  { number: "~45", desc: "active researchers working collaboratively on challenging projects." },
];

const CommunityResearch = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0, y: 40, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: textRef.current, start: "top 85%", once: true },
      });

      gsap.from(videoRef.current, {
        opacity: 0, x: 40, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: videoRef.current, start: "top 85%", once: true },
      });

      gsap.from(".stat-item", {
        opacity: 0, y: 24, stagger: 0.15, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 85%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Left: text + stats */}
      <div ref={textRef} className="flex flex-col gap-6">
        <SectionTitle>Community Research</SectionTitle>
        <p className="text-p1 text-thunder/75 leading-relaxed">
          Our lab takes a community-centered approach where students collaborate, share ideas,
          and learn from each other. Together, they explore real-world questions, build research
          skills, and create meaningful, collective solutions.
        </p>

        <div ref={statsRef} className="flex flex-col gap-4 pt-2">
          {STATS.map(({ number, desc }) => (
            <div key={number} className="stat-item flex gap-4 items-start p-4 bg-alabaster rounded-2xl">
              <span className="label-2 text-well-red shrink-0 leading-none">{number}</span>
              <p className="text-p2 text-thunder/70 leading-snug pt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: vertical video */}
      <div ref={videoRef} className="flex justify-center md:justify-end">
        <div className="relative w-full max-w-[260px] md:max-w-[300px]">
          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-xl">
            <video
              src="/videos/hci.mov"
              className="w-full h-full object-cover"
              controls
              playsInline
              preload="metadata"
            />
          </div>
          <div className="absolute -top-3 -right-4 bg-well-red text-white font-oxanium font-medium text-xs px-3 py-1.5 rounded-full rotate-6 shadow-md">
            #ourstudio
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityResearch;
