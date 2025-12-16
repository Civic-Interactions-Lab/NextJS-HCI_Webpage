"use client";

import { motion } from "framer-motion";
import SponsorCard from "@/modules/sponsors/ui/components/SponsorCard";
import { SponsorsQueryResult } from "../../../../../sanity.types";

interface SponsorListProps {
  sponsors: SponsorsQueryResult;
}

const SponsorList = ({ sponsors }: SponsorListProps) => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-center md:text-left mb-8 lg:mb-12 max-w-4xl mx-auto"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          Our Sponsors
        </h2>
        <p className="text-base lg:text-lg text-gray-600">
          Thank you to our current sponsors for your generous support! Your
          contributions help the HCI Lab continue to grow, innovate, and empower
          students to make a real impact through research and design.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 max-w-4xl mx-auto">
        {sponsors.map((sponsor, index) => (
          <SponsorCard key={sponsor._id} sponsor={sponsor} index={index} />
        ))}
      </div>
    </section>
  );
};

export default SponsorList;
