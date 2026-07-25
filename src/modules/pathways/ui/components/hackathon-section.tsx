"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/section-title";
import { sectionFadeUp } from "@/modules/pathways/constants";

const IMAGES = [
  {
    src: "/images/cover/owlhacks-2024-full-committee.jpg",
    alt: "OwlHacks 2024 full committee",
    caption: "OwlHacks 2024",
  },
  {
    src: "/images/cover/owlhacks-2025-full-committee.jpg",
    alt: "OwlHacks 2025 full committee",
    caption: "OwlHacks 2025",
  },
  {
    src: "/images/cover/HCI_OpenHouse-5.jpg",
    alt: "Temple HCI Lab Open House",
    caption: "HCI Open House",
  },
  {
    src: "/images/cover/NC_09802.jpg",
    alt: "Temple HCI Lab students",
    caption: "Temple HCI Lab",
  },
];

export default function HackathonSection() {
  const marqueeImages = [...IMAGES, ...IMAGES];

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
        <div className="flex marquee-track">
          {marqueeImages.map((img, i) => (
            <div key={i} className="shrink-0 w-[480px] pr-5">
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
