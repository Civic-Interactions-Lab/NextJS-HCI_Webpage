"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { News } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";
import NewsCategoryLegend from "@/modules/about/ui/components/NewsCategoryLegend";

const categories = [
  { name: "Collaborations", color: "bg-gold" },
  { name: "Grants / Awards", color: "bg-violet" },
  { name: "Conference Talk", color: "bg-grass" },
  { name: "Published Papers", color: "bg-sky" },
  { name: "Alumni", color: "bg-ember" },
];

interface FilterState {
  categories: string[];
}

interface NewsTimelineProps {
  allNews: News[];
}

const NewsTimeline = ({ allNews }: NewsTimelineProps) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
  });

  const years = useMemo(() => {
    const uniqueYears = [
      ...new Set(
        allNews.map((news) =>
          news.date
            ? new Date(news.date).getFullYear()
            : new Date().getFullYear(),
        ),
      ),
    ];
    return uniqueYears.sort((a, b) => b - a);
  }, [allNews]);

  const filteredNews = useMemo(() => {
    if (filters.categories.length === 0) return allNews;
    return allNews.filter(
      (news) => news.category && filters.categories.includes(news.category),
    );
  }, [filters.categories, allNews]);

  const newsByYear = useMemo(() => {
    return filteredNews.reduce(
      (acc, news) => {
        const year = news.date
          ? new Date(news.date).getFullYear()
          : new Date().getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(news);
        return acc;
      },
      {} as Record<number, News[]>,
    );
  }, [filteredNews]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const scrollToYear = (year: number) => {
    const element = document.getElementById(`year-${year}`);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offset = 100;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex gap-4 lg:gap-8">
      <aside className="hidden md:block w-16 lg:w-20 shrink-0 sticky top-8 self-start bg-white/80 backdrop-blur-sm py-3 lg:py-4 px-2 rounded-lg">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 font-outfit">
          Year
        </h3>
        <div className="space-y-1 lg:space-y-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => scrollToYear(year)}
              className="block w-full text-left py-1 lg:py-2 text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              {year}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 font-outfit mb-6 md:mb-8">
          HCI Lab News
        </h1>

        {/* Category Legend */}
        <NewsCategoryLegend onFilterChange={handleFilterChange} />

        {years.map((year) => {
          const yearNews = newsByYear[year];
          if (!yearNews || yearNews.length === 0) return null;

          return (
            <section key={year} id={`year-${year}`} className="">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 font-outfit pt-2 md:pt-4">
                {year}
              </h2>

              <div className="space-y-6 md:space-y-8">
                {yearNews.map((news) => (
                  <div key={news._id} className="flex gap-4 lg:gap-6">
                    <div className="shrink-0 w-0.5 md:w-1 bg-primary-red-900 rounded-full"></div>

                    <div className="flex-1 py-2 md:py-4">
                      <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
                        {news.imageUrl && (
                          <div className="w-full md:w-48 lg:w-64 h-40 lg:h-48 rounded-lg overflow-hidden shrink-0 relative">
                            <Image
                              src={getImageSrc(news.imageUrl)}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        <div className="flex-1 space-y-2 lg:space-y-3">
                          {news.link ? (
                            <a
                              href={news.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 underline cursor-pointer hover:text-gray-700 transition-colors block"
                            >
                              {news.title}
                            </a>
                          ) : (
                            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900">
                              {news.title}
                            </h3>
                          )}

                          {news.description && (
                            <p className="text-sm md:text-base text-gray-600">
                              {news.description}
                            </p>
                          )}

                          <div className="pt-1 lg:pt-2">
                            <span
                              className={`inline-block px-2 lg:px-3 py-1 rounded-full text-white text-xs lg:text-sm font-medium ${
                                categories.find(
                                  (cat) => cat.name === news.category,
                                )?.color || "bg-gray-500"
                              }`}
                            >
                              {news.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default NewsTimeline;
