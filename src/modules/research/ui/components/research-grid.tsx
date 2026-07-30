"use client";

import { motion, type Variants } from "framer-motion";
import { Research } from "../../../../../sanity.types";
import ResearchCard from "@/modules/research/ui/components/research-card";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const gridViewport = { once: true, amount: 0.1 } as const;

interface ResearchGridProps {
  label: string;
  research: Research[];
}

const ResearchGrid = ({ label, research }: ResearchGridProps) => {
  if (research.length === 0) {
    return (
      <div className="py-14">
        <p className="text-p1 text-thunder/50">No papers yet for this category.</p>
      </div>
    );
  }

  return (
    <section aria-label={`Published papers in ${label}`} className="pt-12">
      <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest mb-6">
        Our papers in {label}
      </p>
      <motion.ul
        role="list"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={gridViewport}
        variants={stagger}
      >
        {research.map((r) => (
          <motion.li key={r._id} variants={fadeUp} className="list-none">
            <ResearchCard research={r} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};

export default ResearchGrid;
