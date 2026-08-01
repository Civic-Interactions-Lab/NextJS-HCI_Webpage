"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/section-title";
import { fadeUp, stagger, motionViewportMargin } from "@/lib/motion-tokens";

const DirectorWelcome = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={motionViewportMargin}
      variants={stagger}
      aria-label="Welcome from the Director"
      className="flex flex-col md:flex-row gap-10 md:gap-16 items-start"
    >
      {/* Photo */}
      <motion.div variants={fadeUp} className="shrink-0 w-full md:w-80 lg:w-96">
        <div className="rounded-2xl overflow-hidden bg-thunder/8">
          <Image
            src="/images/people/macneil.jpg"
            alt="Dr. Stephen MacNeil, Director of the Temple HCI Lab, received an award at Temple University"
            width={384}
            height={480}
            className="w-full h-auto object-cover object-top"
          />
        </div>
        <p className="mt-3 font-outfit text-sm font-semibold text-thunder">
          Dr. Stephen MacNeil
        </p>
        <p className="font-outfit text-xs text-thunder/50">
          Director, Temple HCI Lab
        </p>
      </motion.div>

      {/* Text */}
      <motion.div variants={fadeUp} className="flex flex-col gap-4">
        <SectionTitle>Welcome from the Director</SectionTitle>
        <blockquote className="space-y-3">
          <p className="text-p1 text-thunder/85 leading-relaxed">
            Welcome to the Temple HCI Lab! Hi, I am Dr. Stephen MacNeil and I
            believe the best research happens when curious people from different
            backgrounds come together to solve meaningful problems. Our lab is
            built around mentorship, collaboration, and the idea that students
            learn about themselves by doing research.
          </p>
          <p className="text-p1 text-thunder/85 leading-relaxed">
            Whether you&apos;re an undergraduate exploring research for the
            first time or an experienced graduate student, you&apos;ll have the
            opportunity to contribute to projects with real-world impact in
            human-computer interaction, artificial intelligence, computing
            education, assistive technology, and responsible AI. My goal is to
            help every student grow into an independent researcher, develop
            lasting professional skills, and leave the lab more confident than
            when they joined.
          </p>
        </blockquote>
      </motion.div>
    </motion.section>
  );
};

export default DirectorWelcome;
