"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Event } from "../../../../../sanity.types";
import { SectionTitle } from "@/components/section-title";
import { getImageSrc } from "@/lib/utils";
import { useStaggerReveal } from "@/modules/about/hooks/use-scroll-reveal";

const EVENT_CATEGORY_BG: Record<string, string> = {
  Social: "bg-well-red text-white",
  Hackathon: "bg-gold text-thunder",
  Conference: "bg-sky text-white",
  Showcase: "bg-grass text-white",
};

const formatEventDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

const formatEventYear = (date?: string) =>
  date ? new Date(date).getFullYear().toString() : null;

interface EventsUpcomingProps {
  events: Event[];
}

const EventsUpcoming = ({ events }: EventsUpcomingProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(rootRef, ".featured-card", {
    y: 60,
    duration: 0.7,
    ease: "power3.out",
    trigger: ".featured-card",
  });
  useStaggerReveal(rootRef, ".side-card", {
    y: 50,
    stagger: 0.12,
    duration: 0.6,
    trigger: ".side-card",
  });

  if (events.length === 0) return null;

  const featuredIndex = events.findIndex((e) => e.featured);
  const featured = events[featuredIndex === -1 ? 0 : featuredIndex];
  const rest = events.filter((e) => e._id !== featured._id);

  return (
    <section ref={rootRef} className="flex flex-col gap-8">
      <SectionTitle>Upcoming Events</SectionTitle>

      {/* Featured card */}
      <div className="featured-card group relative rounded-3xl overflow-hidden border border-thunder/8 flex flex-col md:flex-row gap-0 shadow-sm hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto shrink-0">
          <Image
            src={getImageSrc(featured.imageUrl)}
            alt={featured.title ?? "Temple HCI Lab event"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-alabaster/20 md:bg-linear-to-r" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between gap-6 p-8 md:p-10 flex-1">
          <div className="flex flex-col gap-4">
            {featured.category && (
              <div className="flex items-start">
                <span
                  className={`font-outfit text-xs font-medium px-3 py-1 rounded-full ${EVENT_CATEGORY_BG[featured.category] ?? "bg-thunder text-white"}`}
                >
                  {featured.category}
                </span>
              </div>
            )}
            {featured.link ? (
              <Link
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-outfit font-medium text-2xl md:text-3xl text-thunder hover:text-well-red leading-tight transition-colors"
              >
                {featured.title}
              </Link>
            ) : (
              <h3 className="font-outfit font-medium text-2xl md:text-3xl text-thunder leading-tight">
                {featured.title}
              </h3>
            )}
            {featured.description && (
              <p className="text-p1 text-thunder/65 leading-relaxed">
                {featured.description}
              </p>
            )}
          </div>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-0.5">
              <p className="font-outfit font-semibold text-xl text-well-red">
                {formatEventDate(featured.date)}
              </p>
              {featured.location && (
                <p className="font-outfit text-sm text-thunder/50">
                  {featured.location}
                </p>
              )}
            </div>
            <p className="font-outfit text-xs text-thunder/30">
              {formatEventYear(featured.date)}
            </p>
          </div>
        </div>
      </div>

      {/* Remaining cards — alternating vertical offset on desktop */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.map((event) => (
            <div
              key={event._id}
              className="side-card flex flex-col gap-5 rounded-2xl overflow-hidden border border-thunder/8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-40 shrink-0">
                <Image
                  src={getImageSrc(event.imageUrl)}
                  alt={event.title ?? "Temple HCI Lab event"}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 px-5 pb-6">
                {event.category && (
                  <div className="flex items-center">
                    <span
                      className={`font-outfit text-xs font-medium px-2.5 py-0.5 rounded-full ${EVENT_CATEGORY_BG[event.category] ?? "bg-thunder text-white"}`}
                    >
                      {event.category}
                    </span>
                  </div>
                )}
                {event.link ? (
                  <Link
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-outfit font-medium text-lg text-thunder hover:text-well-red leading-snug transition-colors"
                  >
                    {event.title}
                  </Link>
                ) : (
                  <p className="font-outfit font-medium text-lg text-thunder leading-snug">
                    {event.title}
                  </p>
                )}
                {event.description && (
                  <p className="text-p3 text-thunder/65 leading-relaxed">
                    {event.description}
                  </p>
                )}
                <div className="flex items-center justify-between pt-1">
                  <p className="font-outfit font-semibold text-sm text-well-red">
                    {formatEventDate(event.date)}
                  </p>
                  {event.location && (
                    <p className="font-outfit text-sm text-thunder/40">
                      {event.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EventsUpcoming;
