"use client";

import { useRef } from "react";
import Image from "next/image";
import { Event } from "../../../../../sanity.types";
import { SectionTitle } from "@/components/section-title";
import { getImageSrc } from "@/lib/utils";
import { useStaggerReveal } from "@/modules/about/hooks/use-scroll-reveal";

const ROTATIONS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

interface EventsGalleryProps {
  events: Event[];
}

const EventsGallery = ({ events }: EventsGalleryProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(rootRef, ".polaroid", {
    immediateRender: false,
    y: 50,
    stagger: 0.1,
    duration: 0.65,
    start: "top bottom",
  });

  if (events.length === 0) return null;

  return (
    <section ref={rootRef} className="flex flex-col gap-8">
      <SectionTitle>Past Events</SectionTitle>

      {/* Alabaster strip */}
      <div className="-mx-6 md:-mx-12 px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {events.map((event, i) => (
            <div
              key={event._id}
              className={`polaroid flex flex-col gap-2 bg-white shadow-md hover:shadow-xl p-3 md:p-4 rounded-sm ${ROTATIONS[i % ROTATIONS.length]} hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-default`}
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={getImageSrc(event.imageUrl)}
                  alt={event.title ?? "Temple HCI Lab event"}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="text-p3 text-thunder/60 text-center pt-1 pb-0.5 font-outfit italic">
                {event.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsGallery;
