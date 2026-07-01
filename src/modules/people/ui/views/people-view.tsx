"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import ViewIntroHeader from "@/components/view-intro-header";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { People } from "../../../../../sanity.types";
import { SectionTitle } from "@/components/section-title";
import PersonCard from "@/modules/people/ui/components/person-card";
import PeopleFilter from "@/modules/people/ui/components/people-filter";
import CtaBanner from "@/components/cta-banner";
import { PEOPLE_NAV_LINKS, fadeUp, stagger, gridViewport } from "@/modules/people/constants";
import { useNavCardReveal } from "@/modules/people/hooks/use-nav-card-reveal";

interface PeopleViewProps {
  currentMembers: People[];
}

const PeopleView = ({ currentMembers }: PeopleViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return currentMembers;
    return currentMembers.filter(
      (p) => p.status && activeFilters.includes(p.status),
    );
  }, [currentMembers, activeFilters]);

  const navLinks = PEOPLE_NAV_LINKS.filter((link) => link.href !== "/people");

  useNavCardReveal(ref);

  return (
    <div ref={ref} className="space-y-20">
      {/* Intro header */}
      <ViewIntroHeader
        label="Temple HCI Lab"
        titlePrefix="Meet our current"
        titleAccent="lab members."
        body="PhD candidates, master's students, undergraduate researchers, and participants in the Research Scholars Program — who bring creativity, curiosity, and collaboration to every project. Together, we explore ideas, share knowledge, and support one another's growth as we advance our lab's research and impact."
        imageSrc="/images/cover/3-studio.jpg"
        imageAlt="Students working together in the Temple HCI Lab studio"
      />

      {/* Filter + Grid */}
      <section aria-label="Current Temple HCI Lab members">
        <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest mb-4">
          Current Members
        </p>
        <PeopleFilter
          total={currentMembers.length}
          onFilterChange={setActiveFilters}
        />
        <motion.ul
          role="list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={gridViewport}
          variants={stagger}
        >
          {filtered.map((person) => (
            <motion.li key={person._id} variants={fadeUp} className="list-none">
              <PersonCard person={person} />
            </motion.li>
          ))}
        </motion.ul>

        {filtered.length === 0 && (
          <p className="text-p1 text-thunder/50 py-12">
            No members match the selected filters.
          </p>
        )}
      </section>

      {/* Memory wall quotes cloud */}
      {/* <QuoteBoard /> */}

      {/* Quick nav to other people sections */}
      <nav aria-label="Other Temple HCI Lab people pages" className="border-t border-thunder/8">
        {navLinks.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            aria-label={`View ${link.label} — Temple HCI Lab`}
            className={`people-nav-card group flex flex-col gap-3 py-8 border-b border-thunder/8 ${i % 2 === 1 ? "-mx-6 md:-mx-12 px-6 md:px-12 bg-alabaster" : ""}`}
          >
            <SectionTitle>{link.label}</SectionTitle>
            <p className="text-p1 text-thunder/60 leading-relaxed max-w-xl">
              {link.tagline}
            </p>
            <span className="inline-flex items-center gap-1.5 font-outfit text-sm font-semibold uppercase tracking-widest text-thunder group-hover:text-well-red transition-colors w-fit mt-1">
              View {link.label}{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </nav>

      {/* Join banner */}
      <CtaBanner
        label="Join the Lab"
        title="Interested in becoming a member?"
        body="We're always looking for curious, driven students to join our research community. PhD, masters, undergrad — all welcome."
        ctaLabel="Apply Now"
        ctaHref="/join"
      />
    </div>
  );
};

export default PeopleView;
