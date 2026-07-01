"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ResearchHero from "@/modules/research/ui/components/research-hero";
import CtaBanner from "@/components/cta-banner";
import { SectionTitle } from "@/components/section-title";
import { CATEGORIES } from "@/modules/research/constants";
import { useStaggerFade } from "@/modules/research/hooks/use-stagger-fade";

const ResearchView = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useStaggerFade(cardsRef, ".other-card");
  useStaggerFade(cardsRef, ".featured-video", { y: 40, duration: 0.8, stagger: 0 });

  return (
    <div className="space-y-20">
      <ResearchHero />

      {/* Category sections */}
      <nav
        ref={cardsRef}
        aria-label="Temple HCI Lab research topics"
        className="border-t border-thunder/8"
      >
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.label}
            href={cat.href}
            aria-label={`Learn more about ${cat.label} research at the Temple HCI Lab`}
            className={`other-card group flex flex-col gap-3 py-8 border-b border-thunder/8 transition-colors ${i % 2 === 1 ? "-mx-6 md:-mx-12 px-6 md:px-12 bg-alabaster" : ""}`}
          >
            <SectionTitle>{cat.label}</SectionTitle>
            <p className="text-p1 text-thunder/60 leading-relaxed max-w-xl">
              {cat.tagline}
            </p>
            <span className="inline-flex items-center gap-1.5 font-outfit text-sm font-semibold uppercase tracking-widest text-thunder group-hover:text-well-red transition-colors w-fit mt-1">
              Learn More{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </nav>

      {/* Teaser video */}
      <figure className="featured-video flex flex-col lg:flex-row gap-8 pb-14 m-0">
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
        <figcaption className="flex flex-col justify-center gap-3">
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
        </figcaption>
      </figure>

      <CtaBanner
        label="Get Involved"
        title="Interested in joining our research?"
        body="The Temple HCI Lab welcomes undergraduate and graduate students who are passionate about human-centered design, AI, accessibility, and social computing. Apply to join and help shape the future of HCI research."
        ctaLabel="Apply to join"
        ctaHref="/join"
      />
    </div>
  );
};

export default ResearchView;
