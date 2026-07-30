"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { People } from "../../../../../sanity.types";
import PersonCard from "@/modules/people/ui/components/person-card";
import PeopleFilter from "@/modules/people/ui/components/people-filter";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

interface CurrentMembersProps {
  currentMembers: People[];
}

const CurrentMembers = ({ currentMembers }: CurrentMembersProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return currentMembers;
    return currentMembers.filter(
      (p) => p.status && activeFilters.includes(p.status),
    );
  }, [currentMembers, activeFilters]);

  return (
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
  );
};

export default CurrentMembers;
