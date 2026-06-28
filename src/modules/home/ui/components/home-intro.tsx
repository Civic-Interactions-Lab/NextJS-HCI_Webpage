"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { SectionTitle } from "@/components/section-title";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const HomeIntro = () => {
  return (
    <motion.section
      id="intro"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="space-y-4"
    >
      <motion.div variants={fadeUp}>
        <SectionTitle>
          Human Computer Interaction at Temple University
        </SectionTitle>
      </motion.div>
      <motion.p variants={fadeUp} className="text-p1 text-thunder/85 max-w-3xl">
        Welcome! We&apos;re the Temple HCI Lab — the largest undergraduate
        research lab at Temple University. You&apos;ll find us in the{" "}
        <Link
          href="https://cst.temple.edu"
          className="underline underline-offset-2 hover:text-well-red transition-colors"
        >
          College of Science and Technology
        </Link>{" "}
        within the Department of Computer and Information Sciences, led by{" "}
        <Link
          href="https://stevemacn.github.io/"
          className="underline underline-offset-2 hover:text-well-red transition-colors"
        >
          Dr. Stephen MacNeil.
        </Link>
      </motion.p>
    </motion.section>
  );
};

export default HomeIntro;
