"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { News } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";
import NewsCategoryLegend from "@/modules/about/ui/components/news-category-legend";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_COLORS: Record<string, string> = {
  Collaborations: "bg-gold",
  "Grants / Awards": "bg-violet",
  "Conference Talk": "bg-grass",
  "Published Papers": "bg-sky",
  Alumni: "bg-ember",
};

const CATEGORY_BORDER: Record<string, string> = {
  Collaborations: "border-l-gold",
  "Grants / Awards": "border-l-violet",
  "Conference Talk": "border-l-grass",
  "Published Papers": "border-l-sky",
  Alumni: "border-l-ember",
};

interface FilterState {
  categories: string[];
}

interface NewsTimelineProps {
  allNews: News[];
}

const NewsTimeline = ({ allNews }: NewsTimelineProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<FilterState>({ categories: [] });

  const years = useMemo(() => {
    const unique = [
      ...new Set(
        allNews.map((n) =>
          n.date ? new Date(n.date).getFullYear() : new Date().getFullYear()
        )
      ),
    ];
    return unique.sort((a, b) => b - a);
  }, [allNews]);

  const filteredNews = useMemo(() => {
    if (filters.categories.length === 0) return allNews;
    return allNews.filter(
      (n) => n.category && filters.categories.includes(n.category)
    );
  }, [filters.categories, allNews]);

  const newsByYear = useMemo(() => {
    return filteredNews.reduce(
      (acc, n) => {
        const year = n.date
          ? new Date(n.date).getFullYear()
          : new Date().getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(n);
        return acc;
      },
      {} as Record<number, News[]>
    );
  }, [filteredNews]);

  const scrollToYear = (year: number) => {
    const el = document.getElementById(`year-${year}`);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".year-header", {
        immediateRender: false,
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          once: true,
        },
      });
      gsap.from(".news-card", {
        immediateRender: false,
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [filteredNews]);

  return (
    <div ref={rootRef} className="flex gap-6 lg:gap-12">
      {/* Sticky year nav */}
      <aside className="hidden md:flex flex-col gap-3 w-14 lg:w-16 shrink-0 sticky top-24 self-start pt-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => scrollToYear(year)}
            className="font-outfit font-bold text-base lg:text-lg text-thunder/25 hover:text-well-red transition-colors text-left leading-none"
          >
            {year}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col gap-6">
        {/* Intro */}
        <div className="flex flex-col gap-3 mb-4">
          <p className="font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
            Lab News
          </p>
          <h1 className="font-outfit font-medium text-4xl md:text-5xl text-thunder leading-tight">
            What&apos;s happening in the lab.
          </h1>
          <p className="text-p1 text-thunder/70 leading-relaxed max-w-2xl">
            Publications, awards, collaborations, and milestones from the Temple
            HCI Lab community.
          </p>
        </div>

        {/* Filter */}
        <NewsCategoryLegend onFilterChange={setFilters} />

        {/* Timeline */}
        <div className="flex flex-col gap-16 mt-4">
          {years.map((year) => {
            const items = newsByYear[year];
            if (!items || items.length === 0) return null;

            return (
              <section key={year} id={`year-${year}`} className="flex flex-col gap-6">
                {/* Year header */}
                <div className="year-header relative flex items-end gap-4 pb-3 border-b border-well-red/30">
                  <span className="absolute -top-4 left-0 font-outfit font-bold text-7xl md:text-9xl text-thunder/5 leading-none select-none pointer-events-none">
                    {year}
                  </span>
                  <h2 className="relative font-outfit font-semibold text-2xl text-thunder">
                    {year}
                  </h2>
                  <span className="relative font-outfit text-sm text-thunder/40 pb-0.5">
                    {items.length} {items.length === 1 ? "story" : "stories"}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-4">
                  {items.map((news) => {
                    const borderColor =
                      CATEGORY_BORDER[news.category ?? ""] ?? "border-l-thunder/20";
                    const badgeColor =
                      CATEGORY_COLORS[news.category ?? ""] ?? "bg-thunder/30";
                    const dateStr = news.date
                      ? new Date(news.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : null;

                    return (
                      <div
                        key={news._id}
                        className={`news-card bg-white rounded-2xl shadow-sm hover:shadow-md border border-thunder/8 border-l-4 ${borderColor} p-5 md:p-6 transition-shadow`}
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          {news.imageUrl && (
                            <div className="relative w-full md:w-48 shrink-0 rounded-xl overflow-hidden aspect-video">
                              <Image
                                src={getImageSrc(news.imageUrl)}
                                alt={news.title ?? ""}
                                fill
                                sizes="(max-width: 768px) 100vw, 192px"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex flex-col gap-2 flex-1">
                            {news.link ? (
                              <a
                                href={news.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-outfit font-medium text-lg text-thunder hover:text-well-red underline transition-colors"
                              >
                                {news.title}
                              </a>
                            ) : (
                              <p className="font-outfit font-medium text-lg text-thunder">
                                {news.title}
                              </p>
                            )}
                            {news.description && (
                              <p className="text-p2 text-thunder/65 leading-relaxed">
                                {news.description}
                              </p>
                            )}
                            <div className="flex items-center gap-3 pt-1 flex-wrap">
                              {news.category && (
                                <span
                                  className={`font-outfit text-xs font-medium text-white px-3 py-1 rounded-full ${badgeColor}`}
                                >
                                  {news.category}
                                </span>
                              )}
                              {dateStr && (
                                <span className="font-outfit text-sm text-thunder/40">
                                  {dateStr}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default NewsTimeline;
