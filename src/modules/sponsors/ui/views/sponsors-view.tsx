"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { SponsorsQueryResult } from "../../../../../sanity.types";
import { SectionTitle } from "@/components/section-title";
import SponsorCard from "@/modules/sponsors/ui/components/sponsor-card";
import SponsorFilter from "@/modules/sponsors/ui/components/sponsor-filter";
import ViewIntroHeader from "@/components/view-intro-header";

gsap.registerPlugin(ScrollTrigger);

interface SponsorsViewProps {
  sponsors: SponsorsQueryResult;
}

const SponsorsView = ({ sponsors }: SponsorsViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeTiers, setActiveTiers] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (activeTiers.length === 0) return sponsors;
    return sponsors.filter(
      (s) =>
        (s as { tier?: string }).tier &&
        activeTiers.includes((s as { tier?: string }).tier!),
    );
  }, [sponsors, activeTiers]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".people-nav-card", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".people-nav-card",
          start: "top bottom",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="space-y-20">
      {/* Intro header */}
      <ViewIntroHeader
        label="Our Sponsors"
        titlePrefix="The organizations that make our"
        titleAccent="work possible."
        body="Thank you to our sponsors for your generous support. Your contributions help the HCI Lab continue to grow, innovate, and empower students to make a real impact through research and design."
        imageSrc="/images/cover/NC_09802.jpg"
        imageAlt="HCI Lab sponsors"

      />

      {/* Filter */}
      <SponsorFilter total={filtered.length} onFilterChange={setActiveTiers} />

      {/* Sponsor grid */}
      <div className="flex flex-col gap-12">
        {filtered.map((sponsor, i) => (
          <motion.div
            key={sponsor._id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: "easeOut" as const,
              delay: i * 0.07,
            }}
          >
            <SponsorCard sponsor={sponsor} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="text-p1 text-thunder/50 py-12">
            No sponsors match the selected tier.
          </p>
        )}
      </div>

      {/* Become a Sponsor nav card */}
      <div className="border-t border-thunder/8">
        <Link
          href="/sponsors/become"
          className="people-nav-card group flex flex-col gap-3 py-8 border-b border-thunder/8"
        >
          <SectionTitle>Become a Sponsor</SectionTitle>
          <p className="text-p1 text-thunder/60 leading-relaxed max-w-xl">
            Partner with the Temple HCI Lab to support student researchers and
            advance human-centered technology.
          </p>
          <span className="inline-flex items-center gap-1.5 font-outfit text-sm font-semibold uppercase tracking-widest text-thunder group-hover:text-well-red transition-colors w-fit mt-1">
            Learn More{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SponsorsView;
