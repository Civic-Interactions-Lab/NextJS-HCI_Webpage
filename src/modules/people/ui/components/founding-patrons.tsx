"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { fadeUp, stagger, motionViewport } from "@/lib/motion-tokens";

const PLACEHOLDER_PATRONS = [{ id: "patron-slot-1" }, { id: "patron-slot-2" }];

const FoundingPatrons = () => (
  <motion.section
    className="flex flex-col gap-4"
    initial="hidden"
    whileInView="visible"
    viewport={motionViewport}
    variants={fadeUp}
  >
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
      <SectionTitle>Top Patrons</SectionTitle>
      <p className="font-outfit text-sm text-thunder/50">
        The ones who fund full research stipends
      </p>
    </div>

    <motion.ul
      role="list"
      className="grid sm:grid-cols-2 gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={stagger}
    >
      {PLACEHOLDER_PATRONS.map((patron) => (
        <motion.li key={patron.id} variants={fadeUp} className="list-none">
          <Link
            href="https://giving.temple.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-6 h-full rounded-2xl border border-dashed border-thunder/20 bg-white p-8 transition-colors hover:border-gold/50"
          >
            <div className="flex items-center justify-center w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-full border border-dashed border-thunder/20">
              <Sparkles className="w-9 h-9 text-gold/70" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center self-start text-xs font-outfit font-medium px-2.5 py-1 rounded-full bg-gold text-white uppercase tracking-wide">
                Top Patron
              </span>
              <p className="font-outfit font-medium text-lg text-thunder">
                This spot is open
              </p>
              <p className="text-sm text-thunder/50">
                Give $500+ and we&apos;ll feature your name (or company) here
              </p>
            </div>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  </motion.section>
);

export default FoundingPatrons;
