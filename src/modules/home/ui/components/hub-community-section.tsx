"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/section-title";
import { SectionLink } from "@/components/section-link";
import { AccentBlob } from "@/components/accent-blob";
import { HomeHubCommunityQueryResult } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";

const PARTNERS = [
  { name: "ACM", color: "bg-sky/15 text-sky" },
  { name: "TUDev", color: "bg-grass/15 text-grass" },
  { name: "OwlByte", color: "bg-gold/15 text-gold" },
  { name: "OwlHacks", color: "bg-well-red/15 text-well-red" },
] as const;

interface HubCommunitySectionProps {
  hubCommunityImage: HomeHubCommunityQueryResult;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const HubCommunitySection = ({ hubCommunityImage }: HubCommunitySectionProps) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="py-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <motion.div variants={fadeUp} className="flex flex-col gap-6">
          <SectionTitle>A Hub for Communities</SectionTitle>
          <p className="text-p1 text-thunder/85">
            We love helping students build the skills and confidence to design, lead, and
            innovate within their own communities. Through hands-on research, projects, and
            friendly collaboration with organizations we cheer on like the ones below, we create
            pathways for students to turn ideas into real-world impact.
          </p>
          <div className="flex flex-wrap gap-2">
            {PARTNERS.map((partner) => (
              <span
                key={partner.name}
                className={`label-5 px-3 py-1 rounded-full ${partner.color}`}
              >
                {partner.name}
              </span>
            ))}
          </div>
          <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-block">
            <SectionLink href="/about/events">Connect with us</SectionLink>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} className="relative">
          <AccentBlob className="absolute -bottom-10 -right-10 w-32 h-32 text-grass/25 -z-10" />
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={getImageSrc(hubCommunityImage?.asset)}
              alt={hubCommunityImage?.alt || "HCI Lab community"}
              width={500}
              height={360}
              className="w-full h-64 md:h-80 object-cover"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HubCommunitySection;
