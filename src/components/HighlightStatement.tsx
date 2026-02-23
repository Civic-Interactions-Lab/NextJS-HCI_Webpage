"use client";

import React from "react";
import { motion } from "framer-motion";

interface HighlightStatementProps {
  mainText: string;
  subText?: string;
  borderPosition?: "left" | "right";
  className?: string;
}

const HighlightStatement = ({
  mainText,
  subText,
  borderPosition = "left",
  className = "",
}: HighlightStatementProps) => {
  return (
    <motion.div
      className={`flex border-primary-red-800 px-4 ${className} ${
        borderPosition === "left"
          ? "items-start border-l-6 md:border-l-8 lg:border-l-12"
          : "justify-end border-r-6 md:border-r-8 lg:border-r-12"
      }`}
    >
      <motion.p
        className={` text-lg md:text-xl font-outfit ${
          borderPosition === "left" ? "text-left" : "text-right"
        }`}
      >
        <span className="text-primary-red-800 uppercase font-jetbrains-mono  font-semibold">
          {" "}
          {mainText}
        </span>{" "}
        {subText}
      </motion.p>
    </motion.div>
  );
};

export default HighlightStatement;
