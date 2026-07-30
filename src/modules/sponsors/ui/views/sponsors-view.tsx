"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { SponsorsQueryResult } from "../../../../../sanity.types";
import SponsorCard from "@/modules/sponsors/ui/components/sponsor-card";
import SponsorFilter from "@/modules/sponsors/ui/components/sponsor-filter";
import NavCardsList from "@/components/nav-cards-list";
import ViewIntroHeader from "@/components/view-intro-header";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

interface SponsorsViewProps {
  sponsors: SponsorsQueryResult;
}

const SPONSOR_NAV_ITEMS = [
  {
    label: "Become a Sponsor",
    href: "/sponsors/become",
    tagline:
      "Partner with the Temple HCI Lab to support student researchers and advance human-centered technology.",
  },
];

export default function SponsorsView({ sponsors }: SponsorsViewProps) {
  const [activeTiers, setActiveTiers] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (activeTiers.length === 0) return sponsors;
    return sponsors.filter(
      (s) =>
        (s as { tier?: string }).tier &&
        activeTiers.includes((s as { tier?: string }).tier!),
    );
  }, [sponsors, activeTiers]);

  return (
    <div className="space-y-32">
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
        key={activeTiers.join(",")}
        role="list"
        aria-label="Temple HCI Lab sponsors"
        className="flex flex-col gap-12"
        initial="hidden"
        animate="visible"
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
      <NavCardsList ariaLabel="Sponsorship opportunities" items={SPONSOR_NAV_ITEMS} />
    </div>
  );
};

