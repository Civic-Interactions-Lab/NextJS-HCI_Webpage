"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SponsorsQueryResult } from "../../../../../sanity.types";
import { SectionTitle } from "@/components/section-title";
import SponsorCard from "@/modules/sponsors/ui/components/sponsor-card";
import SponsorFilter from "@/modules/sponsors/ui/components/sponsor-filter";
import ViewIntroHeader from "@/components/view-intro-header";
import { fadeUp, stagger, gridViewport } from "@/modules/sponsors/constants";
import { useNavCardReveal } from "@/modules/sponsors/hooks/use-nav-card-reveal";

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

  useNavCardReveal(ref);

  return (
    <div ref={ref} className="space-y-20">
      {/* Intro header */}
      <ViewIntroHeader
        label="Our Sponsors"
        titlePrefix="The organizations that make our"
        titleAccent="work possible."
        body="Thank you to our sponsors for your generous support. Your contributions help the HCI Lab continue to grow, innovate, and empower students to make a real impact through research and design."
        imageSrc="/images/cover/NC_09802.jpg"
        imageAlt="Temple HCI Lab research materials on display"
      />

      {/* Filter */}
      <SponsorFilter total={filtered.length} onFilterChange={setActiveTiers} />

      {/* Sponsor grid */}
      <motion.ul
        role="list"
        aria-label="Temple HCI Lab sponsors"
        className="flex flex-col gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={gridViewport}
        variants={stagger}
      >
        {filtered.map((sponsor) => (
          <motion.li key={sponsor._id} variants={fadeUp} className="list-none">
            <SponsorCard sponsor={sponsor} />
          </motion.li>
        ))}
        {filtered.length === 0 && (
          <p className="text-p1 text-thunder/50 py-12">
            No sponsors match the selected tier.
          </p>
        )}
      </motion.ul>

      {/* Become a Sponsor nav card */}
      <nav aria-label="Sponsorship opportunities" className="border-t border-thunder/8">
        <Link
          href="/sponsors/become"
          aria-label="Learn how to become a Temple HCI Lab sponsor"
          className="people-nav-card group flex flex-col gap-3 py-8 border-b border-thunder/8"
        >
          <SectionTitle>Become a Sponsor</SectionTitle>
          <p className="text-p1 text-thunder/60 leading-relaxed max-w-xl">
            Partner with the Temple HCI Lab to support student researchers and
            advance human-centered technology.
          </p>
          <span className="inline-flex items-center gap-1.5 font-outfit text-sm font-semibold uppercase tracking-widest text-thunder group-hover:text-well-red transition-colors w-fit mt-1">
            Learn More{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default SponsorsView;
