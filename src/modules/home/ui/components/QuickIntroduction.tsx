"use client";

import { motion, Variants } from "framer-motion";
import { SectionHeading } from "@/components/AppTitle";
import { LinkButton } from "@/components/AppButton";

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

const QuickIntroduction = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionHeading
            title="Human Computer Interaction at Temple University"
            className="mb-3 md:mb-6"
          />
        </motion.div>

        <motion.div className="mb-8 md:mb-12" variants={itemVariants}>
          <p className="text-base md:text-lg xl:text-xl text-gray-800 mb-4 font-outfit">
            The Temple HCI Lab is the largest undergraduate research lab at
            Temple University. Housed in the{" "}
            <span className="font-bold underline underline-offset-2">
              College of Science and Technology
            </span>{" "}
            within the Department of Computer and Information Sciences. The lab
            is directed by{" "}
            <span className="font-bold underline underline-offset-2">
              Dr. Stephen MacNeil.
            </span>
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <SectionHeading title="RESEARCH AREAS" className="mb-4 md:mb-8" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          variants={containerVariants}
        >
          {RESEARCH_AREAS.map((area) => (
            <motion.div
              key={area.id}
              className="bg-well-red text-white p-4 md:p-5 flex flex-col"
              variants={cardVariants}
            >
              <h3 className="text-lg md:text-xl font-extrabold mb-3 md:mb-5 font-jetbrains-mono">
                {area.title}
              </h3>
              <p className="text-sm mb-6 grow font-jetbrains-mono">
                {area.description}
              </p>
              <LinkButton
                href="/about"
                ariaLabel="Learn more about HCI Lab"
                text="Learn More"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuickIntroduction;
