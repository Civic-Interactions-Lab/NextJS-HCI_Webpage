"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { People } from "../../../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { statusColors, statusLabels, quoteReveal } from "@/modules/people/constants";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const PersonCard = ({ person }: { person: People }) => {
  if (!person.name) return null;

  const imgSrc = person.img ? urlFor(person.img).width(800).height(800).url() : null;
  const statusColor = person.status ? statusColors[person.status] : null;
  const statusLabel = person.status ? statusLabels[person.status] : null;

  const inner = (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="rounded-2xl overflow-hidden bg-white border border-thunder/10 hover:shadow-md hover:border-thunder/20 transition-all duration-200 h-full"
    >
      {/* Square avatar */}
      <div className="relative w-full aspect-square">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={person.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-outfit font-bold text-2xl text-thunder/30">
              {getInitials(person.name)}
            </span>
          </div>
        )}
      </div>

      {/* Info strip */}
      <div className="px-3 py-3 flex flex-col gap-1">
        <p className="font-outfit font-medium text-sm text-thunder leading-snug">
          {person.name}
        </p>
        {statusLabel && statusColor && (
          <span
            className="self-start text-[10px] font-outfit font-medium px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: statusColor }}
          >
            {statusLabel}
          </span>
        )}
        {person.affiliation && (
          <p className="text-[11px] text-thunder/50 leading-snug">
            {person.affiliation}
          </p>
        )}
        {person.association === "alumni" && person.now && (
          <p className="text-[10px] text-thunder/40 italic mt-0.5">
            Now: {person.now}
          </p>
        )}
        {person.quote && (
          <motion.p
            variants={quoteReveal}
            className="text-[11px] text-thunder/60 italic leading-snug overflow-hidden"
          >
            &ldquo;{person.quote}&rdquo;
          </motion.p>
        )}
      </div>
    </motion.div>
  );

  if (person.url) {
    return (
      <Link
        href={person.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${person.name}'s profile — Temple HCI Lab`}
        className="block h-full cursor-pointer"
      >
        {inner}
      </Link>
    );
  }

  return <div className="h-full">{inner}</div>;
};

export default PersonCard;
