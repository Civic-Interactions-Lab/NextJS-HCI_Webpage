"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { People } from "../../../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";

const statusColors: Record<string, string> = {
  pi: "#8b5cf6",
  phd: "#3b82f6",
  ms: "#10b981",
  ug: "#f59e0b",
  hs: "#ef4444",
};

const statusLabels: Record<string, string> = {
  pi: "Assistant Professor",
  phd: "PhD Student",
  ms: "Masters Student",
  ug: "Undergraduate",
  hs: "High School",
};

type TeamMember = NonNullable<People>;

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

function PersonCard({
  person,
  index = 0,
}: {
  person: TeamMember;
  index?: number;
}) {
  const [hoveredRoleIndex, setHoveredRoleIndex] = useState<number | null>(null);

  if (!person.name) return null;

  const roles = Array.isArray(person.roles) ? person.roles : [];

  const handleCardClick = () => {
    if (person.url) {
      window.open(person.url, "_blank", "noopener,noreferrer");
    }
  };

  const altText = `${person.name}, ${roles[0] ? statusLabels[roles[0]] || roles[0] : "Research Team Member"} at ${person.affiliation || "Research Lab"}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
    >
      <Card
        className={`h-full text-center border-gray-300 shadow-lg ${
          person.url
            ? "cursor-pointer hover:scale-105 transition-all duration-100"
            : ""
        }`}
        onClick={handleCardClick}
      >
        <CardHeader>
          <div className="flex justify-center">
            <Avatar className="size-20 lg:size-32">
              <AvatarImage
                src={person.img ? urlFor(person.img).url() : ""}
                alt={altText}
                className="object-cover"
                loading="lazy"
                decoding="async"
              />
              <AvatarFallback className="text-4xl font-bold bg-gray-200 text-gray-600">
                {getInitials(person.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          <h3 className="text-base lg:text-lg font-bold">{person.name}</h3>

          {person.affiliation && (
            <p className="text-muted-foreground text-sm lg:text-base">
              {person.affiliation}
            </p>
          )}

          {/* Show additional info for alumni */}
          {person.status === "alumni" && person.now && (
            <p className="text-sm text-gray-500 italic">Now: {person.now}</p>
          )}

          {/* Show years */}
          {(person.start || person.end) && (
            <p className="text-xs text-gray-400">
              {person.start}
              {person.end ? ` - ${person.end}` : " - Present"}
            </p>
          )}
        </CardHeader>

        <CardContent className="-mt-2">
          {/* Role indicators */}
          <div className="flex justify-center items-center gap-2 mb-3 flex-wrap">
            <AnimatePresence>
              {roles.map((role, roleIndex) => {
                const isExpanded = hoveredRoleIndex === roleIndex;
                return (
                  <motion.div
                    key={roleIndex}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      cursor-pointer rounded-full
                      flex items-center justify-center overflow-hidden
                      ${isExpanded ? "px-4 h-6 lg:h-8 min-w-[2rem]" : "size-6 lg:size-8"}
                    `}
                    style={{ backgroundColor: statusColors[role] || "#6b7280" }}
                    title={!isExpanded ? statusLabels[role] || role : undefined}
                    onMouseEnter={() => setHoveredRoleIndex(roleIndex)}
                    onMouseLeave={() => setHoveredRoleIndex(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <motion.span
                      className="text-white text-xs font-medium whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {statusLabels[role] || role}
                    </motion.span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default PersonCard;
