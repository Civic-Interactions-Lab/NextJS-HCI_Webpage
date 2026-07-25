"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionTitle } from "@/components/section-title";
import { fadeUp, stagger, sectionViewport } from "@/modules/home/constants";

const HomeIntro = () => {
  return (
    <motion.section
      id="intro"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={stagger}
      className="space-y-4"
    >
      <motion.div variants={fadeUp}>
        <SectionTitle>
          Human Computer Interaction at Temple University
        </SectionTitle>
      </motion.div>
      <motion.p variants={fadeUp} className="text-p1 text-thunder/85 max-w-3xl">
        Welcome to the Temple HCI Lab! Located in Philadelphia, we&apos;re the
        largest undergraduate research lab at Temple University. Based in the{" "}
        <Link
          href="https://cst.temple.edu"
          className="text-well-red underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          College of Science and Technology
        </Link>
        &apos;s Department of Computer and Information Sciences, our lab is led
        by{" "}
        <Link
          href="https://stevemacn.github.io/"
          className="text-well-red underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          Dr. Stephen MacNeil
        </Link>
        . We conduct interdisciplinary research at the intersection of
        human-computer interaction (HCI), artificial intelligence (AI),
        computing education, assistive technology, and responsible AI. Our
        community includes students from many disciplines, including computer
        science, psychology, design, and management information systems. Our
        commitment to undergraduate research has led to more than 80
        undergraduate researchers co-authoring peer-reviewed papers and
        conference posters through the lab.
      </motion.p>
    </motion.section>
  );
};

export default HomeIntro;
