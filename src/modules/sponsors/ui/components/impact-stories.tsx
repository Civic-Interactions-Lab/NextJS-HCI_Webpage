"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { IMPACT_STORIES, fadeUp, stagger, gridViewport } from "@/modules/sponsors/constants";

const ImpactStories = () => (
  <section className="flex flex-col gap-6">
    <div className="flex flex-col gap-2 max-w-2xl">
      <SectionTitle>Students who benefited</SectionTitle>
      <p className="text-p1 text-thunder/65 leading-relaxed">
        Sponsorships directly fund student research stipends, conference travel,
        and lab resources. Here&apos;s what that means in practice.
      </p>
    </div>

    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-5"
      initial="hidden"
      whileInView="visible"
      viewport={gridViewport}
      variants={stagger}
    >
      {IMPACT_STORIES.map((story) => (
        <motion.blockquote
          key={story.id}
          variants={fadeUp}
          className="flex flex-col gap-4 bg-alabaster rounded-2xl p-6"
        >
          <Quote className="w-5 h-5 text-well-red shrink-0" fill="currentColor" strokeWidth={0} />
          <p className="text-p1 text-thunder/80 leading-relaxed flex-1">{story.quote}</p>
          <footer className="border-t border-thunder/10 pt-4">
            <p className="font-outfit text-sm font-semibold text-thunder">{story.name}</p>
            <p className="font-outfit text-xs text-thunder/50 mt-0.5">{story.role}</p>
          </footer>
        </motion.blockquote>
      ))}
    </motion.div>
  </section>
);

export default ImpactStories;
