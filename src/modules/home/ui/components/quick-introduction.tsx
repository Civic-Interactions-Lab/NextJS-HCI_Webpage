"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/section-title";

const RESEARCH_AREAS = [
  {
    id: "assistive-tech",
    title: "Assistive Tech",
    description:
      "AAC tools to foster self direction and expressive communication.",
  },
  {
    id: "computing-education",
    title: "Computing Education",
    description:
      "We study the harms of AI and develop scaffolding to promote responsible use.",
  },
  {
    id: "future-of-work",
    title: "Future of Work",
    description:
      "We develop tools to build better workplaces, and to reimagine work.",
  },
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const QuickIntroduction = () => {
  return (
    <section className="w-full space-y-12">
      <motion.div
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
        <motion.p
          variants={fadeUp}
          className="text-p1 text-thunder/85 max-w-3xl"
        >
          The Temple HCI Lab is the largest undergraduate research lab at Temple
          University. Housed in the{" "}
          <Link
            href="https://cst.temple.edu"
            className="underline underline-offset-2 hover:text-well-red transition-colors"
          >
            College of Science and Technology
          </Link>{" "}
          within the Department of Computer and Information Sciences. The lab is
          directed by{" "}
          <Link
            href="https://stevemacn.github.io/"
            className="underline underline-offset-2 hover:text-well-red transition-colors"
          >
            Dr. Stephen MacNeil.
          </Link>
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="space-y-6"
      >
        <motion.div variants={fadeUp}>
          <SectionTitle>Research Areas</SectionTitle>
        </motion.div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {RESEARCH_AREAS.map((area) => (
            <motion.div
              key={area.id}
              variants={fadeUp}
              className="group bg-well-red rounded-2xl p-6 flex flex-col gap-4 hover:bg-deep-red transition-colors duration-300"
            >
              <div className="w-8 h-1 bg-white/40 group-hover:bg-white transition-colors duration-300" />
              <h3 className="label-3 text-white">{area.title}</h3>
              <p className="text-p2 text-white/80 grow">{area.description}</p>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 label-5 text-white/70 group-hover:text-white group-hover:gap-3 transition-all min-h-11"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default QuickIntroduction;
