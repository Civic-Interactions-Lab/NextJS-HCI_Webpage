"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionTitle } from "@/components/section-title";
import { UPCOMING_EVENTS, EVENT_TAG_BG } from "@/modules/about/constants";
import { useStaggerReveal } from "@/modules/about/hooks/use-scroll-reveal";

const EventsUpcoming = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(rootRef, ".featured-card", { y: 60, duration: 0.7, ease: "power3.out", trigger: ".featured-card" });
  useStaggerReveal(rootRef, ".side-card", { y: 50, stagger: 0.12, duration: 0.6, trigger: ".side-card" });

  const [featured, ...rest] = UPCOMING_EVENTS;

  return (
    <section ref={rootRef} className="flex flex-col gap-10">
      <SectionTitle>Upcoming Events</SectionTitle>

      {/* Featured card */}
      <div className="featured-card group relative rounded-3xl overflow-hidden bg-alabaster border border-thunder/8 flex flex-col md:flex-row gap-0 shadow-sm hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto shrink-0">
          <Image
            src="/images/cover/6-studio.JPG"
            alt={featured.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-alabaster/20 md:bg-linear-to-r" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between gap-6 p-8 md:p-10 flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex items-start">
              <span
                className={`font-outfit text-xs font-medium px-3 py-1 rounded-full ${EVENT_TAG_BG[featured.tag] ?? "bg-thunder text-white"}`}
              >
                {featured.tag}
              </span>
            </div>
            <h3 className="font-outfit font-medium text-2xl md:text-3xl text-thunder leading-tight">
              {featured.title}
            </h3>
            <p className="text-p1 text-thunder/65 leading-relaxed">
              {featured.description}
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-0.5">
              <p className="font-outfit font-semibold text-xl text-well-red">
                {featured.date}
              </p>
              <p className="font-outfit text-sm text-thunder/50">
                {featured.location}
              </p>
            </div>
            <p className="font-outfit text-xs text-thunder/30">
              {featured.year}
            </p>
          </div>
        </div>
      </div>

      {/* Remaining cards — alternating vertical offset on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {rest.map(({ title, date, year, location, tag, description }, i) => (
          <div
            key={title}
            className="side-card flex flex-col gap-5 rounded-2xl overflow-hidden bg-alabaster border border-thunder/8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative w-full h-40 shrink-0">
              <Image
                src="/images/cover/6-studio.JPG"
                alt={title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 px-5 pb-6">
              <div className="flex items-center">
                <span
                  className={`font-outfit text-xs font-medium px-2.5 py-0.5 rounded-full ${EVENT_TAG_BG[tag] ?? "bg-thunder text-white"}`}
                >
                  {tag}
                </span>
              </div>
              <p className="font-outfit font-medium text-lg text-thunder leading-snug">
                {title}
              </p>
              <p className="text-p3 text-thunder/65 leading-relaxed">
                {description}
              </p>
              <div className="flex items-center justify-between pt-1">
                <p className="font-outfit font-semibold text-sm text-well-red">
                  {date}
                </p>
                <p className="font-outfit text-sm text-thunder/40">
                  {location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsUpcoming;
