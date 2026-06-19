"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Research } from "../../../../../sanity.types";
import ResearchCard from "@/modules/research/ui/components/research-card";
import ResearchJoinBanner from "@/modules/research/ui/components/research-join-banner";
import TopicLogoGenAI from "@/modules/research/ui/components/topic-logo-gen-ai";
import TopicLogoAccessibility from "@/modules/research/ui/components/topic-logo-accessibility";
import TopicLogoSocial from "@/modules/research/ui/components/topic-logo-social";
import { SectionTitle } from "@/components/section-title";
import { CATEGORIES } from "@/modules/research/ui/research-data";

gsap.registerPlugin(ScrollTrigger);

const LOGO_MAP: Record<string, React.ReactNode> = {
  "Gen AI & Education": <TopicLogoGenAI />,
  "Accessibility Technology": <TopicLogoAccessibility />,
  "Future of Work": <TopicLogoSocial />,
};

interface ResearchTopicViewProps {
  label: string;
  tagline: string;
  description: string;
  accent: string;
  research: Research[];
}

const ResearchTopicView = ({
  label,
  tagline,
  description,
  accent,
  research,
}: ResearchTopicViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const otherCategories = CATEGORIES.filter((c) => c.label !== label);
  const cat = CATEGORIES.find((c) => c.label === label);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".topic-header-line", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".topic-header-line",
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
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="space-y-20">
      {/* Two-column hero — matches research overview layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 overflow-hidden">
        {/* Left: label + title + body */}
        <div className="flex flex-col gap-4 flex-1">
          <p className="topic-header-line font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
            Temple HCI Lab Research
          </p>
          <h1 className="topic-header-line font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-thunder leading-tight">
            {label.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-well-red">
              {label.split(" ").slice(-1)[0]}
            </span>
          </h1>
          <p className="topic-header-line text-p1 text-thunder/60 leading-relaxed italic">
            &ldquo;{tagline}&rdquo;
          </p>
          <p className="topic-header-line text-p1 text-thunder/70 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Right: topic-specific animated logo */}
        <div className="w-full lg:w-[360px] shrink-0">{LOGO_MAP[label]}</div>
      </div>

      {/* Papers grid */}
      {research.length > 0 ? (
        <div className="pt-12">
          <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest mb-6">
            Our papers in {label}
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {research.map((r) => (
              <motion.div
                key={r._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
              >
                <ResearchCard research={r} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="py-14">
          <p className="text-p1 text-thunder/50">
            No papers yet for this category.
          </p>
        </div>
      )}

      {/* Other topics */}
      <div className="border-t border-thunder/8">
        {otherCategories.map((cat, i) => (
          <Link
            key={cat.label}
            href={cat.href}
            className={`other-card group flex flex-col gap-4 py-12 px-0 border-b border-thunder/8 ${i % 2 === 1 ? "-mx-6 md:-mx-12 px-6 md:px-12 bg-alabaster" : ""}`}
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

      {/* Featured video */}
      {cat?.videoUrl && (
        <div className="featured-video flex flex-col lg:flex-row gap-8 py-14 border-t border-thunder/8">
          <div className="w-full lg:w-1/2 shrink-0">
            <iframe
              src={cat.videoUrl}
              title={cat.videoTitle}
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
              {cat.videoTitle}
            </p>
            <p className="text-p1 text-thunder/65 leading-relaxed">
              {cat.videoDescription}
            </p>
          </div>
        </div>
      )}

      <ResearchJoinBanner />
    </div>
  );
};

export default ResearchTopicView;
