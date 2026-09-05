"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { People } from "../../../../../sanity.types";
import { fadeUp, stagger, motionViewport } from "@/lib/motion-tokens";

const CollaboratorsGrid = ({ collaborators }: { collaborators: People[] }) => {
  if (collaborators.length === 0) {
    return <p className="text-p1 text-thunder/50 py-12">No collaborators found.</p>;
  }

  return (
    <motion.ul
      role="list"
      aria-label="Temple HCI Lab collaborators"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={stagger}
    >
      {collaborators.map((person) => (
        <motion.li key={person._id} variants={fadeUp} className="list-none">
          <CollaboratorCard person={person} />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default CollaboratorsGrid;

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const CollaboratorCard = ({ person }: { person: People }) => {
  if (!person.name) return null;

  const inner = (
    <div className="flex flex-col items-center gap-4 text-center rounded-2xl border border-thunder/10 shadow-sm hover:shadow-md hover:border-thunder/20 transition-all duration-200 p-8">
      <div className="w-24 h-24 rounded-full flex items-center justify-center shrink-0 bg-well-red text-white">
        <span className="font-outfit font-bold text-2xl leading-none">
          {getInitials(person.name)}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-outfit font-medium text-base text-thunder leading-snug">
          {person.name}
        </p>
        {person.affiliation && (
          <p className="text-sm text-thunder/50 leading-snug">
            {person.affiliation}
          </p>
        )}
      </div>
    </div>
  );

  if (person.url) {
    return (
      <Link
        href={person.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${person.name}'s profile — Temple HCI Lab collaborator`}
        className="group block"
      >
        {inner}
      </Link>
    );
  }

  return <div>{inner}</div>;
};
