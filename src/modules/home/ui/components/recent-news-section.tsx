"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { SectionLink } from "@/components/section-link";
import { News } from "../../../../../sanity.types";
import { formatDate, getImageSrc } from "@/lib/utils";

interface RecentNewsSectionProps {
  recentNews: News[];
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const RecentNewsSection = ({ recentNews }: RecentNewsSectionProps) => {
  const orderedNews = [...recentNews].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="w-full space-y-8"
    >
      <motion.div variants={fadeUp} className="flex items-center justify-between flex-wrap gap-4">
        <SectionTitle>Recent News</SectionTitle>
        <SectionLink href="/about/news">All news</SectionLink>
      </motion.div>

      <motion.div
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {/* Brand title card */}
        <motion.div
          variants={fadeUp}
          whileHover={{ rotate: -1.5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="bg-well-red rounded-2xl p-6 flex-col justify-end hidden md:flex"
        >
          <p className="heading-5 text-white/40 leading-none">recent</p>
          <p className="heading-5 text-white leading-none">news</p>
        </motion.div>

        {orderedNews.map((item) => {
          const img = item.imageUrl ? getImageSrc(item.imageUrl) : null;
          return (
            <motion.a
              key={item._id}
              variants={fadeUp}
              whileHover={{ y: -6, rotate: -0.5 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              href={item.link || ""}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col border border-thunder/10 rounded-2xl overflow-hidden hover:border-well-red/40 hover:shadow-lg transition-colors"
            >
              {img ? (
                <div className="relative h-40 overflow-hidden shrink-0">
                  <Image
                    src={img}
                    alt={item.title || "News"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-40 bg-alabaster shrink-0" />
              )}
              <div className="flex flex-col gap-2 p-4 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.featured && (
                    <span className="label-5 text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded-full text-[11px] inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      FEATURED
                    </span>
                  )}
                  <span className="label-5 text-thunder/60">{formatDate(item.date)}</span>
                </div>
                <p className="label-4 text-thunder line-clamp-3 group-hover:text-well-red transition-colors">
                  {item.title}
                </p>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </motion.section>
  );
};

export default RecentNewsSection;
