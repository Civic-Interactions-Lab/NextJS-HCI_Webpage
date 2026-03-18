"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/AppTitle";
import TapeTag from "@/components/TapeTag";
import { LinkButton } from "@/components/AppButton";
import Image from "next/image";
import { HomeHubCommunityQueryResult } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";

interface HubCommunitySectionProps {
  hubCommunityImage: HomeHubCommunityQueryResult;
}

const HubCommunitySection = ({
  hubCommunityImage,
}: HubCommunitySectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  const slideUpVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
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

  const tagVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: 0,
    },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      rotate: custom,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        staggerChildren: 0.2,
      }}
    >
      <motion.div className="flex flex-col gap-6" variants={slideUpVariants}>
        <SectionHeading title="A HUB FOR COMMUNITIES" />
        <p className="text-sm md:text-base xl:text-lg text-gray-700 leading-relaxed">
          The HCI Lab empowers students with the skills and confidence to
          design, lead, and innovate within their own communities. Through
          hands-on research, projects, and collaboration with organizations like
          <b> ACM, TUDev, OwlByte,</b> and <b>OwlHacks</b> we create pathways
          for students to turn ideas into real-world impact.
        </p>
        <LinkButton
          href="/about?sub=events"
          text="Connect"
          ariaLabel="Connect with HCI Lab community"
        />
      </motion.div>

      <motion.div className="relative p-4 md:p-6" variants={slideUpVariants}>
        {/* Image container */}
        <div className="shadow-lg">
          <Image
            src={getImageSrc(hubCommunityImage?.asset)}
            alt={hubCommunityImage?.alt || ""}
            width={500}
            height={300}
            className="w-full h-64 md:h-80 object-cover ml-4 md:ml-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          {/* Animated Tags */}
          <motion.div
            className="absolute top-10 -left-2 px-3 md:px-6 py-1 md:py-2 bg-sky rounded-full"
            variants={tagVariants}
            custom={-16}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-xs md:text-sm text-white font-semibold uppercase">
              #team
            </p>
          </motion.div>

          <motion.div
            className="absolute top-24 -left-6 px-3 md:px-6 py-1 md:py-2 bg-gold rounded-full"
            variants={tagVariants}
            custom={8}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-xs md:text-sm text-white font-semibold uppercase">
              #community
            </p>
          </motion.div>

          <motion.div
            className="absolute top-44 left-0 px-3 md:px-6 py-1 md:py-2 bg-well-red rounded-full"
            variants={tagVariants}
            custom={16}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-xs md:text-sm text-white font-semibold uppercase">
              #hci
            </p>
          </motion.div>

          <TapeTag position="bottom-left" rotation={16} color="white">
            <p className="text-xs md:text-sm font-light font-jetbrains-mono leading-tight wrap-break-word whitespace-normal max-w-32 md:max-w-40 line-clamp-3">
              {hubCommunityImage?.alt}
            </p>
          </TapeTag>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HubCommunitySection;
