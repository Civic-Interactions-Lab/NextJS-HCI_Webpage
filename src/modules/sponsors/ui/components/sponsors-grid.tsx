"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SponsorsQueryResult } from "../../../../../sanity.types";
import SponsorCard from "@/modules/sponsors/ui/components/sponsor-card";
import SponsorFilter from "@/modules/sponsors/ui/components/sponsor-filter";
import { fadeUp, stagger } from "@/lib/motion-tokens";

interface SponsorsGridProps {
  sponsors: SponsorsQueryResult;
}

const SponsorsGrid = ({ sponsors }: SponsorsGridProps) => {
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
    <>
      <SponsorFilter total={filtered.length} onFilterChange={setActiveTiers} />

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
    </>
  );
};

export default SponsorsGrid;
