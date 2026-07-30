"use client";

import { motion, type Variants } from "framer-motion";
import { People } from "../../../../../sanity.types";
import PersonCard from "@/modules/people/ui/components/person-card";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const gridViewport = { once: true, amount: 0.1 } as const;

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
      viewport={gridViewport}
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
