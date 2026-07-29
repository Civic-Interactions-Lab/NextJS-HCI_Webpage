"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionTitle } from "@/components/section-title";
import { EVENTS_GALLERY } from "@/modules/about/constants";
import { useStaggerReveal } from "@/modules/about/hooks/use-scroll-reveal";

const EventsGallery = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(rootRef, ".polaroid", {
    immediateRender: false,
    y: 50,
    stagger: 0.1,
    duration: 0.65,
    start: "top bottom",
  });

  return (
    <section ref={rootRef} className="flex flex-col gap-8">
      <SectionTitle>Past Events</SectionTitle>

      {/* Alabaster strip */}
      <div className="-mx-6 md:-mx-12 px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {EVENTS_GALLERY.map(({ src, caption, rotate }, i) => (
            <div
              key={i}
              className={`polaroid flex flex-col gap-2 bg-white shadow-md hover:shadow-xl p-3 md:p-4 rounded-sm ${rotate} hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-default`}
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image src={src} alt={caption} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </div>
              <p className="text-p3 text-thunder/60 text-center pt-1 pb-0.5 font-outfit italic">
                {caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsGallery;
