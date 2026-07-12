"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { People } from "../../../../../sanity.types";
import CollaboratorCard from "@/modules/people/ui/components/collaborator-card";
import NavCardsList from "@/components/nav-cards-list";
import { PEOPLE_NAV_LINKS, fadeUp, stagger, gridViewport } from "@/modules/people/constants";

const CollaboratorsView = ({ collaborators }: { collaborators: People[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const navLinks = PEOPLE_NAV_LINKS.filter((link) => link.href !== "/people/collaborators");

  return (
    <div ref={ref} className="space-y-16">
      {collaborators.length === 0 ? (
        <p className="text-p1 text-thunder/50 py-12">No collaborators found.</p>
      ) : (
        <motion.ul
          role="list"
          aria-label="Temple HCI Lab collaborators"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={gridViewport}
          variants={stagger}
        >
          {collaborators.map((person) => (
            <motion.li key={person._id} variants={fadeUp} className="list-none">
              <CollaboratorCard person={person} />
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

export default CollaboratorsView;
