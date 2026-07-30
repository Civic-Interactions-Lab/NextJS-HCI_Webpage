"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/section-title";

const sectionFadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const AiMajorSection = () => (
  <motion.section className="flex flex-col gap-4 max-w-3xl" {...sectionFadeUp}>
    <SectionTitle>Explore the new AI Major at Temple</SectionTitle>
    <p className="text-p1 text-thunder/65 leading-relaxed">
      Alongside Professors Dominic Letarte and Chiu Tan, Dr. Stephen MacNeil
      led the development of Temple University&apos;s Bachelor of Science in
      Artificial Intelligence, helping shape a curriculum that combines
      technical AI foundations with human-centered design and responsible AI.
      Building on his expertise in human-computer interaction and applied
      artificial intelligence, the program prepares students to develop
      intelligent systems that are effective, ethical, and centered on human
      needs. Students gain experience in machine learning, data science,
      natural language processing, and AI system design while developing the
      interdisciplinary skills needed for careers in industry, graduate school,
      and research.
    </p>
  </motion.section>
);

export default AiMajorSection;
