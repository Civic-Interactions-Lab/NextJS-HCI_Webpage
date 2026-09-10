"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { People, AlumniProfile } from "../../../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { motionDuration, motionEase } from "@/lib/motion-tokens";
import { PERSON_STATUS_LABELS, PERSON_STATUS_COLORS } from "@/modules/people/constants/person-status";

type PersonWithProfile = People & {
  profile?: Pick<AlumniProfile, "nowType" | "now"> | null;
};

const quoteReveal: Variants = {
  rest: { height: 0, opacity: 0, marginTop: 0 },
  hover: {
    height: "auto",
    opacity: 1,
    marginTop: 4,
    transition: { duration: motionDuration.fast, ease: motionEase },
  },
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const PersonCard = ({ person }: { person: PersonWithProfile }) => {
  if (!person.name) return null;

  const imgSrc = person.img
    ? urlFor(person.img).width(800).height(800).url()
    : null;
  const isAlumni = person.association === "alumni";
  const statusColor = !isAlumni && person.status ? PERSON_STATUS_COLORS[person.status] : null;
  const statusLabel = !isAlumni && person.status ? PERSON_STATUS_LABELS[person.status] : null;

  const inner = (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="rounded-2xl overflow-hidden bg-white border border-thunder/10 shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col"
    >
      {/* Square avatar */}
      <div className="relative w-full aspect-square">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={`${person.name} at Temple HCI Lab, Philadelphia, Pennsylvania`}
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

      {/* Info */}
      <div className="px-5 pt-5 pb-6 flex flex-col gap-1.5">
        {statusLabel && statusColor && (
          <span
            className="font-outfit font-bold text-xs uppercase tracking-widest"
            style={{ color: statusColor }}
          >
            {statusLabel}
          </span>
        )}
        <p className="font-outfit font-semibold text-2xl leading-tight text-thunder">
          {person.name}
        </p>
        {!isAlumni && person.affiliation && (
          <p className="text-sm text-thunder/60">
            {person.affiliation}
          </p>
        )}
        {isAlumni && person.profile?.now && (
          <p className="text-sm text-thunder/70">
            {person.profile.now}
          </p>
        )}
        {person.quote && (
          <motion.p
            variants={quoteReveal}
            className="text-sm text-thunder/60 italic leading-snug overflow-hidden"
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
