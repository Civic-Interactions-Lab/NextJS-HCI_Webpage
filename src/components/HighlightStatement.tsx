"use client";

import React from "react";
import { motion } from "framer-motion";

interface HighlightStatementProps {
  mainText: string;
  subText?: string;
  borderPosition?: "left" | "right";
  className?: string;
  index?: number;
}

const HighlightStatement = ({
  mainText,
  subText,
  borderPosition = "left",
  className = "",
  index = 0,
}: HighlightStatementProps) => {
  // const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, margin: "50px" });
  //
  // const borderDelay = index * 0.1;
  // const textDelay = borderDelay + 0.4;

  return (
    <motion.div
      // ref={ref}
      // initial={{
      //   scaleY: 0,
      //   originY: 0,
      // }}
      // animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
      // transition={{
      //   duration: 0.4,
      //   delay: borderDelay,
      //   ease: "easeOut",
      // }}
      // style={{
      //   transformOrigin: "top",
      // }}
      className={`flex border-primary-red-800 px-4 ${className} ${
        borderPosition === "left"
          ? "items-start border-l-6 md:border-l-8 lg:border-l-12"
          : "justify-end border-r-6 md:border-r-8 lg:border-r-12"
      }`}
    >
      <motion.p
        // initial={{ opacity: 0, x: borderPosition === "left" ? -30 : 30 }}
        // animate={
        //   isInView
        //     ? { opacity: 1, x: 0 }
        //     : { opacity: 0, x: borderPosition === "left" ? -30 : 30 }
        // }
        // transition={{
        //   duration: 0.5,
        //   delay: textDelay,
        //   ease: "easeOut",
        // }}
        className={`font-jetbrains-mono text-sm md:text-base lg:text-lg ${
          borderPosition === "left" ? "text-left" : "text-right"
        }`}
      >
        <span className="text-primary-red-800 uppercase font-semibold">
          {mainText}
        </span>{" "}
        {subText}
      </motion.p>
    </motion.div>
  );
};

export default HighlightStatement;
