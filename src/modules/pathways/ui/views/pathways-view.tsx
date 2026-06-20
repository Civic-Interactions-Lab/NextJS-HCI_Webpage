"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CourseList from "@/modules/pathways/ui/components/course-list";
import JobOutcomes from "@/modules/pathways/ui/components/job-outcomes";
import OtherOpportunities from "@/modules/pathways/ui/components/other-opportunities";

const headerLines = [
  {
    el: "label",
    content: "Temple HCI Lab",
  },
  {
    el: "heading",
    content: null,
  },
  {
    el: "body",
    content:
      "The Temple HCI Lab helps students explore careers in technology, design, research, and AI. Whether you are curious about user experience design, data visualization, artificial intelligence, or academic research, there are multiple ways to get involved.",
  },
];

const PathwaysView = () => (
  <div className="space-y-20">
    {/* §A — Intro header */}
    <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
      {/* Left */}
      <div className="flex flex-col gap-4 flex-1">
        <motion.p
          className="font-outfit text-sm font-medium text-well-red uppercase tracking-widest"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0 }}
        >
          Temple HCI Lab
        </motion.p>
        <motion.h1
          className="font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-thunder leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          Explore Human-Centered{" "}
          <span className="text-well-red">Technology.</span>
        </motion.h1>
        <motion.p
          className="text-p1 text-thunder/65 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          The Temple HCI Lab helps students explore careers in technology,
          design, research, and AI. Whether you are curious about user
          experience design, data visualization, artificial intelligence, or
          academic research, there are multiple ways to get involved.
        </motion.p>
      </div>

      {/* Right — studio image */}
      <motion.div
        className="w-full lg:w-[420px] shrink-0 h-[320px] lg:h-[440px] rounded-2xl overflow-hidden"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
      >
        <Image
          src="/images/cover/6-studio.JPG"
          alt="HCI Lab studio"
          width={420}
          height={440}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>

    {/* §B — Course list */}
    <CourseList />

    {/* §C — Job outcomes */}
    <JobOutcomes />

    {/* §D — Other opportunities */}
    <OtherOpportunities />
  </div>
);

export default PathwaysView;
