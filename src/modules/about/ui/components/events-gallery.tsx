"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SectionTitle } from "@/components/section-title";

gsap.registerPlugin(ScrollTrigger);

const GALLERY = [
  {
    src: "/images/cover/6-studio.JPG",
    caption: "OwlHacks 2024",
    rotate: "-rotate-2",
  },
  {
    src: "/images/cover/6-studio.JPG",
    caption: "HCI Open House",
    rotate: "rotate-1",
  },
  {
    src: "/images/cover/6-studio.JPG",
    caption: "CHI 2024 — Honolulu",
    rotate: "-rotate-1",
  },
  {
    src: "/images/cover/6-studio.JPG",
    caption: "Studio Showcase",
    rotate: "rotate-2",
  },
  {
    src: "/images/cover/6-studio.JPG",
    caption: "CSCW 2023",
    rotate: "-rotate-1",
  },
  {
    src: "/images/cover/6-studio.JPG",
    caption: "Spring Social",
    rotate: "rotate-1",
  },
];

const EventsGallery = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".polaroid", {
        immediateRender: false,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="flex flex-col gap-8">
      <SectionTitle>Past Events</SectionTitle>

      {/* Alabaster strip */}
      <div className="-mx-6 md:-mx-12 bg-alabaster px-6 md:px-12 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {GALLERY.map(({ src, caption, rotate }, i) => (
            <div
              key={i}
              className={`polaroid flex flex-col gap-2 bg-white shadow-md hover:shadow-xl p-3 md:p-4 rounded-sm ${rotate} hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-default`}
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image src={src} alt={caption} fill className="object-cover" />
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
