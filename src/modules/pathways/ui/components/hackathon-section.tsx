"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/section-title";
import { motionDuration, motionEase } from "@/lib/motion-tokens";

const sectionFadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: motionDuration.slow, ease: motionEase },
} as const;

const IMAGES = [
  {
    src: "/images/cover/hacks-3.jpg",
    alt: "OwlHacks 2025 full committee, Temple University, Philadelphia, PA",
    caption:
      "OwlHacks Committee 2025, SERC, Temple University, Philadelphia, PA",
  },
  {
    src: "/images/cover/hacks-4.jpg",
    alt: "OwlHacks 2025 Participants, Temple University, Philadelphia, PA",
    caption:
      "OwlHacks 2025 Participants, SERC, Temple University, Philadelphia, PA",
  },
  {
    src: "/images/cover/hacks-5.jpg",
    alt: "OwlHacks Guest Speaker, Temple University, Philadelphia, PA",
    caption:
      "OwlHacks Guest Speaker, SERC, Temple University, Philadelphia, PA",
  },
  {
    src: "/images/cover/hacks-2.jpg",
    alt: "OwlHacks 2024 full committee, Temple University, Philadelphia, PA",
    caption:
      "OwlHacks Committee 2024, SERC, Temple University, Philadelphia, PA",
  },
  {
    src: "/images/cover/hacks-1.jpg",
    alt: "OwlHacks team, Temple University, Philadelphia, PA",
    caption: "OwlHacks Afterhours, SERC, Temple University, Philadelphia, PA",
  },
];

const MARQUEE_SPEED = 60; // px/second

export default function HackathonSection() {
  const [images, setImages] = useState(IMAGES);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId: number;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      offsetRef.current += MARQUEE_SPEED * dt;

      const itemWidth =
        track.firstElementChild?.getBoundingClientRect().width ?? 0;
      if (itemWidth > 0 && offsetRef.current >= itemWidth) {
        offsetRef.current -= itemWidth;
        setImages((prev) => [...prev.slice(1), prev[0]]);
      } else {
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (track) track.style.transform = `translateX(-${offsetRef.current}px)`;
  }, [images]);

  return (
    <motion.section className="flex flex-col gap-10" {...sectionFadeUp}>
      <div className="flex flex-col gap-4 max-w-3xl">
        <SectionTitle>Join a Hackathon</SectionTitle>
        <p className="text-p1 text-thunder/65 leading-relaxed">
          OwlHacks is one of Philadelphia&apos;s premier student hackathons,
          hosted annually at Temple University and directed by Dr. Stephen
          MacNeil alongside a student leadership team that includes many members
          of the Temple HCI Lab. More than a programming competition, OwlHacks
          brings together students from across disciplines to design, build, and
          pitch innovative solutions to real-world problems. Participants
          develop technical, design, and entrepreneurial skills through
          workshops, mentoring, and collaborative project development. OwlHacks
          is proud to be part of Philadelphia&apos;s growing hackathon community
          alongside events like{" "}
          <span className="text-thunder/80 font-medium">PennApps</span>,{" "}
          <span className="text-thunder/80 font-medium">
            Wharton Hack-AI-thon
          </span>
          , and{" "}
          <span className="text-thunder/80 font-medium">Philly Codefest</span>{" "}
          to connect students, researchers, faculty, and industry professionals
          from across the Philadelphia technology community.
        </p>
      </div>

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex">
          {images.map((img) => (
            <div key={img.src} className="shrink-0 w-[480px] pr-5">
              <div className="overflow-hidden rounded-3xl border border-thunder/10 shadow-sm">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={500}
                  className="w-full h-64 md:h-72 object-cover"
                />
              </div>
              <p className="mt-2 font-outfit text-xs text-thunder/50">
                {img.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
