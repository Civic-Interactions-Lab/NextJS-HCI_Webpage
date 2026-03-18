"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { People } from "../../../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import {
  statusColors,
  statusLabels,
} from "@/modules/people/constants/roleConfig";

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
  const [hoveredIndicatorIndex, setHoveredIndicatorIndex] = useState<
    number | null
  >(null);

  if (!person.name) return null;

  const handleCardClick = () => {
    if (person.url) {
      window.open(person.url, "_blank", "noopener,noreferrer");
    }
  };

  const indicators: {
    type: "status" | "area" | "accomplishment";
    value: string;
    color: string;
    label: string;
  }[] = [];

  if (person.status) {
    indicators.push({
      type: "status",
      value: person.status,
      color: statusColors[person.status],
      label: statusLabels[person.status],
    });
  }

  const altText = `${person.name}, ${indicators[0]?.label || "Research Team Member"} at ${person.affiliation || "Research Lab"}`;

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
          {person.association === "alumni" && person.now && (
            <p className="text-sm text-gray-500 italic">Now: {person.now}</p>
          )}
        </CardHeader>

        <CardContent className="-mt-2">
          {/* Indicator circles */}
          <div className="flex justify-center items-center gap-2 mb-3 flex-wrap">
            <AnimatePresence mode="popLayout">
              {indicators.map((indicator, indicatorIndex) => {
                const isHovered = hoveredIndicatorIndex === indicatorIndex;
                const isAnyHovered = hoveredIndicatorIndex !== null;
                const shouldHide = isAnyHovered && !isHovered;

                return (
                  <motion.div
                    key={`${indicator.type}-${indicatorIndex}`}
                    layout="position"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                      opacity: shouldHide ? 0 : 1,
                      scale: shouldHide ? 0.8 : 1,
                      width: isHovered ? "auto" : "1.5rem",
                      minWidth: isHovered ? "2rem" : "1.5rem",
                    }}
                    transition={{
                      opacity: { duration: 0.15, delay: shouldHide ? 0 : 0.1 },
                      scale: { duration: 0.15, delay: shouldHide ? 0 : 0.1 },
                      width: { duration: 0.2, delay: isHovered ? 0.15 : 0 },
                      minWidth: { duration: 0.2, delay: isHovered ? 0.15 : 0 },
                    }}
                    whileHover={{ scale: shouldHide ? 0.8 : 1.05 }}
                    whileTap={{ scale: shouldHide ? 0.8 : 0.95 }}
                    className={`
                      cursor-pointer rounded-full
                      flex items-center justify-center overflow-hidden
                      h-6
                    `}
                    style={{ backgroundColor: indicator.color }}
                    title={!isHovered ? indicator.label : undefined}
                    onMouseEnter={() =>
                      setHoveredIndicatorIndex(indicatorIndex)
                    }
                    onMouseLeave={() => setHoveredIndicatorIndex(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <motion.span
                      className="text-white text-xs font-medium whitespace-nowrap px-2"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.15,
                        delay: isHovered ? 0.2 : 0,
                      }}
                    >
                      {indicator.label}
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
