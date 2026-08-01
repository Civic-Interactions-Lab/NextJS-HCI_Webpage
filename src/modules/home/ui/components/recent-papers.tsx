"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/section-title";
import { SectionLink } from "@/components/section-link";
import { FeaturedResearchQueryResult } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";
import { fadeUp, stagger, motionViewportMargin } from "@/lib/motion-tokens";

interface FeatureProjectsProps {
  research: FeaturedResearchQueryResult;
}

const RecentPapers = ({ research }: FeatureProjectsProps) => {
  const formatAuthors = (
    authors?: FeaturedResearchQueryResult[0]["authors"],
  ) => {
    if (!authors || authors.length === 0) return "";
    return authors
      .map((a) =>
        a.authorType === "person" ? "Team Member" : a.name || "Author",
      )
      .filter(Boolean)
      .join(", ");
  };

  const getPrimaryAction = (
    actions?: FeaturedResearchQueryResult[0]["actions"],
  ) => {
    if (!actions || actions.length === 0) return null;
    const priorityOrder = ["pdf", "demo", "code", "talk", "cite"];
    return [...actions].sort((a, b) => {
      const ai = priorityOrder.indexOf(a.label || "");
      const bi = priorityOrder.indexOf(b.label || "");
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    })[0];
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={motionViewportMargin}
      variants={stagger}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start"
    >
      {/* Left — featured image */}
      <motion.div variants={fadeUp} className="order-2 lg:order-1">
        <div className="overflow-hidden rounded-3xl border border-thunder/10 shadow-sm">
          <Image
            src="/images/cover/research-2.jpg"
            alt="Christine Kapp from Temple HCI Lab presenting her research poster at SERC, Temple University, Philadelphia, Pennsylvania"
            width={500}
            height={400}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
        <p className="mt-2 font-outfit text-xs text-thunder/50">
          Christine Kapp · SERC, Temple University
        </p>
      </motion.div>

      {/* Right — research list */}
      <div className="order-1 lg:order-2 space-y-8">
        <motion.div variants={fadeUp}>
          <SectionTitle>Recent Papers</SectionTitle>
        </motion.div>

        <motion.div variants={stagger} className="space-y-4">
          {research.map((item) => {
            const action = getPrimaryAction(item.actions);
            const img = item.imageUrl?.asset
              ? getImageSrc(item.imageUrl.asset)
              : null;

            return (
              <motion.div
                key={item._id}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-start gap-4 border border-thunder/10 rounded-2xl p-4 hover:border-well-red/30 hover:shadow-md transition-colors"
              >
                {img ? (
                  <Image
                    src={img}
                    alt={item.title || "Research"}
                    width={56}
                    height={56}
                    className="size-12 md:size-14 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="size-12 md:size-14 rounded-full shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  {action?.url ? (
                    <Link
                      href={action.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-4 text-thunder hover:text-well-red transition-colors line-clamp-2 block"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <p className="label-4 text-thunder line-clamp-2">
                      {item.title}
                    </p>
                  )}
                  <p className="text-p3 text-thunder/65 mt-1 line-clamp-1">
                    {formatAuthors(item.authors)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp}>
          <SectionLink href="/research">Explore all research</SectionLink>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RecentPapers;
