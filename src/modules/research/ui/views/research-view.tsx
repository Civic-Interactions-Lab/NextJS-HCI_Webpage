"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ResearchHero from "@/modules/research/ui/components/research-hero";
import ResearchJoinBanner from "@/modules/research/ui/components/research-join-banner";
import { SectionTitle } from "@/components/section-title";
import { CATEGORIES } from "@/modules/research/ui/research-data";

gsap.registerPlugin(ScrollTrigger);

export { CATEGORIES };

const ResearchView = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".other-card", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".other-card",
          start: "top bottom",
          once: true,
        },
      });
      gsap.from(".featured-video", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".featured-video",
          start: "top bottom",
          once: true,
        },
      });
    }, cardsRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="space-y-20">
      <ResearchHero />

      {/* Category sections */}
      <div ref={cardsRef} className="border-t border-thunder/8">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.label}
            href={cat.href}
            className={`other-card group flex flex-col gap-3 py-8 border-b border-thunder/8 transition-colors ${i % 2 === 1 ? "-mx-6 md:-mx-12 px-6 md:px-12 bg-alabaster" : ""}`}
          >
            <SectionTitle>{cat.label}</SectionTitle>
            <p className="text-p1 text-thunder/60 leading-relaxed max-w-xl">
              {cat.tagline}
            </p>
            <span className="inline-flex items-center gap-1.5 font-outfit text-sm font-semibold uppercase tracking-widest text-thunder group-hover:text-well-red transition-colors w-fit mt-1">
              Learn More{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      {/* Teaser video */}
      <div className="featured-video flex flex-col lg:flex-row gap-8 pb-14">
        <div className="w-full lg:w-1/2 shrink-0">
          <iframe
            src="https://www.youtube.com/embed/-s1_uc-BPqs"
            title="Temple HCI Lab — Teaser"
            className="w-full aspect-video rounded-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center gap-3">
          <p className="font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
            Featured
          </p>
          <p className="font-outfit font-medium text-xl text-thunder leading-snug">
            Temple HCI Lab — Research Overview
          </p>
          <p className="text-p1 text-thunder/65 leading-relaxed">
            A look inside the Temple HCI Lab — our people, our projects, and the
            questions driving our research at the intersection of humans and
            technology.
          </p>
        </div>
      </div>

      <ResearchJoinBanner />
    </div>
  );
};

export default ResearchView;
