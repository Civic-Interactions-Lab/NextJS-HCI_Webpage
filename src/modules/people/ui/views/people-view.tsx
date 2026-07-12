"use client";

import { useMemo, useState } from "react";
import ViewIntroHeader from "@/components/view-intro-header";
import { motion } from "framer-motion";
import { People } from "../../../../../sanity.types";
import PersonCard from "@/modules/people/ui/components/person-card";
import PeopleFilter from "@/modules/people/ui/components/people-filter";
import NavCardsList from "@/components/nav-cards-list";
import CtaBanner from "@/components/cta-banner";
import { PEOPLE_NAV_LINKS, fadeUp, stagger } from "@/modules/people/constants";

interface PeopleViewProps {
  currentMembers: People[];
}

const PeopleView = ({ currentMembers }: PeopleViewProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return currentMembers;
    return currentMembers.filter(
      (p) => p.status && activeFilters.includes(p.status),
    );
  }, [currentMembers, activeFilters]);

  const navLinks = PEOPLE_NAV_LINKS.filter((link) => link.href !== "/people");

  return (
    <div className="space-y-20">
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
          key={activeFilters.join(",")}
          role="list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          animate="visible"
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
      <NavCardsList
        ariaLabel="Other Temple HCI Lab people pages"
        items={navLinks}
        cta={(item) => `View ${item.label}`}
      />

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
