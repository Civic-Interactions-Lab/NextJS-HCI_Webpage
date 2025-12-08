"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BorderTitle } from "@/components/AppTitle";

interface NewsItem {
  id: string;
  date: string;
  title: string;
  link: string;
  imageUrl: string;
}

const newsItems: NewsItem[] = [
  {
    id: "news-1",
    date: "MAY 2025",
    title:
      "Researchers receive $1.5 million grant to develop communication technology",
    link: "https://www.hcilab.org/",
    imageUrl: "/images/cover/5-studio.JPG",
  },
  {
    id: "news-2",
    date: "APR 2025",
    title: "New breakthrough in human-computer interaction research published",
    link: "https://www.hcilab.org/",
    imageUrl: "/images/cover/5-studio.JPG",
  },
  {
    id: "news-3",
    date: "APR 2025",
    title: "Lab members present findings at international conference",
    link: "https://www.hcilab.org/",
    imageUrl: "/images/cover/5-studio.JPG",
  },
];

const RecentNewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

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

        {/* News items - takes remaining 3/4 */}
        {newsItems.map((news, index) => (
          <motion.a
            key={news.id}
            href={news.link}
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
            <Image
              src={news.imageUrl}
              alt=""
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="bg-primary-red-800 text-white text-xs font-medium px-2 py-1 rounded mb-3 w-fit">
                FEATURES
              </div>
              <h3 className="text-white font-semibold text-lg leading-tight">
                {news.title}
              </h3>
            </div>
          </motion.a>
        ))}

        <div className="col-span-3 space-y-3 w-full flex-1 flex-col lg:hidden">
          {newsItems.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1,
                ease: "easeOut",
              }}
              className="px-4 py-2 bg-gray-50 rounded-lg"
            >
              <Link href={news.link} target="_blank" rel="noopener noreferrer">
                <p className="font-semibold text-gray-900 mb-2 text-sm hover:text-primary-red transition-colors">
                  {news.title}
                </p>
                <p className="text-xs text-gray-600">{news.date}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Layout - Simple list */}
      <div className="md:hidden space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <BorderTitle title="Recent News" />
        </motion.div>

        {newsItems.map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: 0.2 + index * 0.1,
              ease: "easeOut",
            }}
            className="px-4 py-2 bg-gray-50 rounded-lg mb-3"
          >
            <Link href={news.link} target="_blank" rel="noopener noreferrer">
              <p className="font-semibold text-gray-900 mb-2 text-sm hover:text-primary-red transition-colors">
                {news.title}
              </p>
              <p className="text-xs text-gray-600">{news.date}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecentNewsSection;
