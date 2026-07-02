"use client";

import Link from "next/link";
import { People } from "../../../../../sanity.types";

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
    <div className="flex flex-col items-center gap-3 text-center rounded-2xl border border-thunder/10 shadow-sm hover:shadow-md hover:border-thunder/20 transition-all duration-200 p-5">
      <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-well-red text-white">
        <span className="font-outfit font-bold text-lg leading-none">
          {getInitials(person.name)}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="font-outfit font-medium text-sm text-thunder leading-snug">
          {person.name}
        </p>
        {person.affiliation && (
          <p className="text-[11px] text-thunder/50 leading-snug">
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

export default CollaboratorCard;
