"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { fadeUp, motionViewport } from "@/lib/motion-tokens";

const IndividualGiving = () => (
  <motion.section
    className="flex flex-col gap-6"
    initial="hidden"
    whileInView="visible"
    viewport={motionViewport}
    variants={fadeUp}
  >
    <div className="flex flex-col gap-2 max-w-2xl">
      <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest">Individual Giving</p>
      <SectionTitle>Give as an individual</SectionTitle>
      <p className="text-p1 text-thunder/65 leading-relaxed">
        Every contribution helps fund student conference travel, research stipends, and lab
        resources, no corporate budget required. Even a small gift has a direct impact on a
        student&apos;s research career.
      </p>
    </div>
    <Link
      href="https://giving.temple.edu"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 self-start rounded-full bg-well-red px-6 py-3 font-outfit text-sm font-semibold text-white transition-opacity hover:opacity-90"
    >
      <Heart className="w-4 h-4" />
      Donate to the HCI Lab
      <ArrowRight className="w-4 h-4" />
    </Link>
  </motion.section>
);

export default IndividualGiving;
