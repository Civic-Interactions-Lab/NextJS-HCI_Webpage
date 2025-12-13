"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BorderHeading } from "@/components/AppTitle";
import { News } from "../../../../../sanity.types";
import { formatDate, getImageSrc } from "@/lib/utils";

interface RecentNewsSectionProps {
  recentNews: News[];
}

const RecentNewsSection = ({ recentNews }: RecentNewsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  const orderedNews = [...recentNews].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full mt-12 md:mt-16"
    >
      {/* Desktop Layout - 4 column grid */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-6 md:h-48 lg:h-64 xl:h-72">
        <motion.div
          className="bg-primary-red-950 text-white pl-3 xl:pl-4.5 pb-3 font-bold flex-shrink-0 relative size-full items-end justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col h-full justify-end">
            <p className="text-4xl xl:!text-6xl !font-outfit">recent</p>
            <p className="text-4xl xl:!text-6xl !font-outfit">news</p>
          </div>

          <div className="absolute top-0 right-12 xl:right-14 size-12 xl:size-14 bg-white" />
          <div className="absolute top-0 right-0 size-12 xl:size-14 bg-primary-red-800" />
          <div className="absolute top-12 right-0 xl:top-14 size-12 xl:size-14 bg-white" />
        </motion.div>

        {orderedNews.map((newsItem, index) => (
          <motion.a
            key={newsItem._id}
            href={newsItem.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.5,
              delay: 0.2 + index * 0.1,
              ease: "easeOut",
            }}
            className="group relative overflow-hidden rounded-lg bg-gray-900 cursor-pointer size-full hidden lg:block"
          >
            {newsItem.imageUrl && (
              <Image
                src={getImageSrc(newsItem.imageUrl)}
                alt=""
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="flex items-end space-x-3 mb-1.5">
                {newsItem.featured && (
                  <div className="bg-primary-red-800 text-white text-xs font-medium px-2 py-1 rounded w-fit">
                    FEATURED
                  </div>
                )}
                <p className="text-sm text-white underline">
                  {formatDate(newsItem.date)}
                </p>
              </div>
              <h3 className="text-white font-semibold text-lg leading-tight line-clamp-3">
                {newsItem.title}
              </h3>
            </div>
          </motion.a>
        ))}

        <div className="col-span-3 space-y-2 w-full flex-1 flex-col ml-3 lg:hidden">
          {orderedNews.map((newsItem, index) => (
            <motion.div
              key={newsItem._id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1,
                ease: "easeOut",
              }}
              className="px-4 py-2 bg-gray-200/80 rounded-lg hover:border-primary-red-800 hover:scale-105 transition-all duration-300 border-2 border-transparent"
            >
              <Link
                href={newsItem.link || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-semibold text-gray-900 text-sm hover:text-primary-red transition-colors flex-1 line-clamp-2">
                    {newsItem.title}
                  </p>
                  {newsItem.featured && (
                    <div className="border-primary-red-800 border-2 text-primary-red-800 text-xs font-medium px-2 py-1 rounded-full flex-shrink-0">
                      FEATURED
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-600">
                  {formatDate(newsItem.date)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <BorderHeading title="Recent News" />
        </motion.div>

        {orderedNews.map((newsItem, index) => (
          <motion.div
            key={newsItem._id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: 0.2 + index * 0.1,
              ease: "easeOut",
            }}
            className="px-4 py-1.5 bg-gray-200/80 rounded-lg hover:border-primary-red-800 hover:scale-105 transition-all duration-300 border-2 border-transparent"
          >
            <Link
              href={newsItem.link || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-semibold text-gray-900 text-sm hover:text-primary-red transition-colors flex-1 line-clamp-2">
                  {newsItem.title}
                </p>
                {newsItem.featured && (
                  <div className="border-primary-red-800 border-2 text-primary-red-800 text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0">
                    FEATURED
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600">
                {formatDate(newsItem.date)}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecentNewsSection;
