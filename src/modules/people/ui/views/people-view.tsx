"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { People } from "../../../../../sanity.types";
import { SectionTitle } from "@/components/section-title";
import PersonCard from "@/modules/people/ui/components/person-card";
import PeopleFilter from "@/modules/people/ui/components/people-filter";
import PeopleJoinBanner from "@/modules/people/ui/components/people-join-banner";

const PEOPLE_LINKS = [
  { label: "Alumni", href: "/people/alumni", tagline: "Former lab members who have gone on to careers in industry, academia, and beyond." },
  { label: "Collaborators", href: "/people/collaborators", tagline: "Researchers and practitioners from other institutions who work alongside our lab." },
];

gsap.registerPlugin(ScrollTrigger);

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

interface PeopleViewProps {
  currentMembers: People[];
}

const PeopleView = ({ currentMembers }: PeopleViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return currentMembers;
    return currentMembers.filter(
      (p) => p.status && activeFilters.includes(p.status)
    );
  }, [currentMembers, activeFilters]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".people-nav-card", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".people-nav-card",
          start: "top bottom",
          once: true,
        },
      });
      gsap.from(".people-header-line", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".people-header-line",
          start: "top bottom",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="space-y-20">
      {/* Intro header */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
        <div className="flex flex-col gap-4 flex-1">
          <p className="people-header-line font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
            Temple HCI Lab
          </p>
          <h1 className="people-header-line font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-thunder leading-tight">
            Meet our current{" "}
            <span className="text-well-red">lab members.</span>
          </h1>
          <p className="people-header-line text-p1 text-thunder/60 leading-relaxed">
            PhD candidates, master&apos;s students, undergraduate researchers,
            and participants in the Research Scholars Program — who bring
            creativity, curiosity, and collaboration to every project. Together,
            we explore ideas, share knowledge, and support one another&apos;s
            growth as we advance our lab&apos;s research and impact.
          </p>
        </div>

        {/* Right — studio image */}
        <div className="w-full lg:w-[420px] shrink-0 h-[320px] lg:h-[440px] rounded-2xl overflow-hidden">
          <Image
            src="/images/cover/3-studio.jpg"
            alt="HCI Lab studio"
            fill={false}
            width={420}
            height={440}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Filter + Grid */}
      <div>
        <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest mb-4">
          Current Members
        </p>
        <PeopleFilter
          total={currentMembers.length}
          onFilterChange={setActiveFilters}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((person, i) => (
            <motion.div
              key={person._id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.07 }}
            >
              <PersonCard person={person} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-p1 text-thunder/50 py-12">
            No members match the selected filters.
          </p>
        )}
      </div>

      {/* Quick nav to other people sections */}
      <div className="border-t border-thunder/8">
        {PEOPLE_LINKS.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            className={`people-nav-card group flex flex-col gap-3 py-8 border-b border-thunder/8 ${i % 2 === 1 ? "-mx-6 md:-mx-12 px-6 md:px-12 bg-alabaster" : ""}`}
          >
            <SectionTitle>{link.label}</SectionTitle>
            <p className="text-p1 text-thunder/60 leading-relaxed max-w-xl">
              {link.tagline}
            </p>
            <span className="inline-flex items-center gap-1.5 font-outfit text-sm font-semibold uppercase tracking-widest text-thunder group-hover:text-well-red transition-colors w-fit mt-1">
              View {link.label}{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      {/* Join banner */}
      <PeopleJoinBanner />
    </div>
  );
};

export default PeopleView;
