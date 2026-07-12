"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { People } from "../../../../../sanity.types";
import PersonCard from "@/modules/people/ui/components/person-card";
import NavCardsList from "@/components/nav-cards-list";
import { PEOPLE_NAV_LINKS, fadeUp, stagger, gridViewport } from "@/modules/people/constants";

const AlumniView = ({ alumni }: { alumni: People[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const navLinks = PEOPLE_NAV_LINKS.filter((link) => link.href !== "/people/alumni");

  return (
    <div ref={ref} className="space-y-16">
      {alumni.length === 0 ? (
        <p className="text-p1 text-thunder/50 py-12">No alumni found.</p>
      ) : (
        <motion.ul
          role="list"
          aria-label="Temple HCI Lab alumni"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={gridViewport}
          variants={stagger}
        >
          {alumni.map((person) => (
            <motion.li key={person._id} variants={fadeUp} className="list-none">
              <PersonCard person={person} />
            </motion.li>
          ))}
        </motion.ul>
      )}

      <NavCardsList
        ariaLabel="Other Temple HCI Lab people pages"
        items={navLinks}
        cta={(item) => `View ${item.label}`}
      />
    </div>
  );
};

export default AlumniView;
