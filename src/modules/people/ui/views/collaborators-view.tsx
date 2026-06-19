"use client";

import { motion } from "framer-motion";
import { People } from "../../../../../sanity.types";
import PersonCard from "@/modules/people/ui/components/person-card";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const CollaboratorsView = ({ collaborators }: { collaborators: People[] }) => {
  if (!collaborators.length) {
    return (
      <p className="text-p1 text-thunder/50 py-12">No collaborators found.</p>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {collaborators.map((person) => (
        <motion.div key={person._id} variants={cardVariants}>
          <PersonCard person={person} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CollaboratorsView;
