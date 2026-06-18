"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Research } from "../../../../../sanity.types";
import { SectionTitle } from "@/components/section-title";
import ResearchCard from "./research-card";

gsap.registerPlugin(ScrollTrigger);

interface ResearchCategoryProps {
  label: string;
  tagline: string;
  videoUrl: string;
  videoTitle: string;
  videoDescription: string;
  research: Research[];
  accent: string;
  index: number;
}

const ResearchCategory = ({
  label,
  tagline,
  videoUrl,
  videoTitle,
  videoDescription,
  research,
  accent,
  index,
}: ResearchCategoryProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isAlabaster = index % 2 === 1;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cat-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".cat-header", start: "top bottom", once: true },
      });
      gsap.from(".cat-video", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".cat-video", start: "top bottom", once: true },
      });
      gsap.from(".research-card", {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".research-card", start: "top bottom", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={`category-section ${isAlabaster ? "-mx-6 md:-mx-12 px-6 md:px-12 py-14 bg-alabaster" : "py-14"}`}
    >
      {/* Watermark + category header */}
      <div className="cat-header relative flex flex-col gap-6 mb-10">
        {/* Watermark number */}
        <span
          aria-hidden="true"
          className="absolute -top-4 right-0 font-outfit font-bold text-[8rem] md:text-[11rem] leading-none text-thunder/5 select-none pointer-events-none"
        >
          0{index + 1}
        </span>

        <div className="flex flex-col gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <SectionTitle>{label}</SectionTitle>
          </div>

          {/* Tagline — right-border Well Red style */}
          <div className="border-r-4 border-well-red pr-5 self-end max-w-xl text-right">
            <p className="font-outfit font-medium text-base md:text-lg text-thunder/70 leading-relaxed italic">
              &ldquo;{tagline}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Video + description */}
      <div className="cat-video flex flex-col lg:flex-row gap-8 mb-12">
        <div className="w-full lg:w-1/2 shrink-0">
          <iframe
            src={videoUrl}
            title={videoTitle}
            className="w-full h-56 md:h-64 rounded-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center gap-3">
          <p className="font-outfit font-medium text-lg text-thunder leading-snug">
            {videoTitle}
          </p>
          <p className="text-p1 text-thunder/65 leading-relaxed">
            {videoDescription}
          </p>
        </div>
      </div>

      {/* Papers grid */}
      {research.length > 0 && (
        <div>
          <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest mb-6">
            Our papers in {label}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {research.map((r) => (
              <ResearchCard key={r._id} research={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchCategory;
