"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

const newsData = [
  {
    id: 1,
    year: 2025,
    title:
      "HCI awarded funding to establish a new Rehabilitation Engineering Research Center (RERC)!",
    description:
      "The HCI Lab has been awarded a major NSF grant to establish a new research center focused on rehabilitation engineering and assistive technology development.",
    category: "Grants / Awards",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    year: 2025,
    title: "HCI members Cindy and Kate present with Philly CHI",
    description:
      "Lab members presented their research on accessibility design patterns at the Philadelphia CHI chapter meetup.",
    category: "Collaborations",
    image: null,
  },
  {
    id: 3,
    year: 2024,
    title:
      "HCI awarded funding to establish a new Rehabilitation Engineering Research Center (RERC)!",
    description:
      "The HCI Lab has been awarded a major NSF grant to establish a new research center focused on rehabilitation engineering and assistive technology development.",
    category: "Grants / Awards",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    year: 2024,
    title: "HCI members Cindy and Kate present with Philly CHI",
    description:
      "Lab members presented their research on accessibility design patterns at the Philadelphia CHI chapter meetup.",
    category: "Collaborations",
    image: null,
  },
  {
    id: 5,
    year: 2024,
    title:
      "HCI awarded funding to establish a new Rehabilitation Engineering Research Center (RERC)!",
    description:
      "The HCI Lab has been awarded a major NSF grant to establish a new research center focused on rehabilitation engineering and assistive technology development.",
    category: "Grants / Awards",
    image: null,
  },
  {
    id: 6,
    year: 2023,
    title: "HCI members Cindy and Kate present with Philly CHI",
    description:
      "Lab members presented their research on accessibility design patterns at the Philadelphia CHI chapter meetup.",
    category: "Collaborations",
    image: null,
  },
  {
    id: 7,
    year: 2023,
    title:
      "HCI awarded funding to establish a new Rehabilitation Engineering Research Center (RERC)!",
    description:
      "The HCI Lab has been awarded a major NSF grant to establish a new research center focused on rehabilitation engineering and assistive technology development.",
    category: "Grants / Awards",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 8,
    year: 2023,
    title: "HCI members Cindy and Kate present with Philly CHI",
    description:
      "Lab members presented their research on accessibility design patterns at the Philadelphia CHI chapter meetup.",
    category: "Collaborations",
    image: null,
  },
];

const categories = [
  { name: "Collaborations", color: "bg-yellow-500" },
  { name: "Grants / Awards", color: "bg-purple-500" },
  { name: "Conference Talk", color: "bg-teal-600" },
  { name: "Published Papers", color: "bg-cyan-600" },
  { name: "Alumni", color: "bg-orange-500" },
];

const NewsTimeline = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const years = useMemo(() => {
    const uniqueYears = [...new Set(newsData.map((news) => news.year))];
    return uniqueYears.sort((a, b) => b - a);
  }, []);

  const filteredNews = useMemo(() => {
    if (!selectedCategory) return newsData;
    return newsData.filter((news) => news.category === selectedCategory);
  }, [selectedCategory]);

  const newsByYear = useMemo(() => {
    return filteredNews.reduce(
      (acc, news) => {
        if (!acc[news.year]) acc[news.year] = [];
        acc[news.year].push(news);
        return acc;
      },
      {} as Record<number, typeof newsData>,
    );
  }, [filteredNews]);

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
    <div className="pt-0 md:pt-6">
      <div className="flex gap-4 lg:gap-8">
        <aside className="hidden md:block w-16 lg:w-20 flex-shrink-0 sticky top-8 self-start bg-white/80 backdrop-blur-sm py-3 lg:py-4 px-2 rounded-lg">
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

          <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 md:mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-colors ${
                !selectedCategory
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium text-white transition-colors ${
                  selectedCategory === category.name
                    ? category.color
                    : `${category.color} opacity-60 hover:opacity-100`
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

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
                    <div key={news.id} className="flex gap-4 lg:gap-6">
                      <div className="flex-shrink-0 w-0.5 md:w-1 bg-red-500 rounded-full"></div>

                      <div className="flex-1 py-2 md:py-4">
                        <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
                          {news.image && (
                            <div className="w-full md:w-48 lg:w-64 h-40 lg:h-48 rounded-lg overflow-hidden flex-shrink-0 relative">
                              <Image
                                src={news.image}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}

                          <div className="flex-1 space-y-2 lg:space-y-3">
                            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 underline cursor-pointer hover:text-gray-700 transition-colors">
                              {news.title}
                            </h3>
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                              {news.description}
                            </p>

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
    </div>
  );
};

export default NewsTimeline;
