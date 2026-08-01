"use client";

import { motion } from "framer-motion";
import { People } from "../../../../../sanity.types";
import PersonCard from "@/modules/people/ui/components/person-card";
import { fadeUp, stagger, motionViewport } from "@/lib/motion-tokens";

const AlumniGrid = ({ alumni }: { alumni: People[] }) => {
  if (alumni.length === 0) {
    return <p className="text-p1 text-thunder/50 py-12">No alumni found.</p>;
  }

  return (
    <motion.ul
      role="list"
      aria-label="Temple HCI Lab alumni"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={stagger}
    >
      {alumni.map((person) => (
        <motion.li key={person._id} variants={fadeUp} className="list-none">
          <PersonCard person={person} />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default AlumniGrid;
