"use client";

import { motion, MotionValue } from "framer-motion";

interface SectionTitleProps {
  children: React.ReactNode;
  light?: boolean;
  // Lets a scroll-driven (or any other) motion value override the
  // text color set by `light`, e.g. animating from white to thunder.
  textColor?: MotionValue<string>;
}

const DOT_COLORS = ["bg-well-red", "bg-gold", "bg-sky", "bg-grass"];

export function SectionTitle({
  children,
  light = false,
  textColor,
}: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <div className="flex flex-col items-center gap-1 md:gap-1 shrink-0">
        {DOT_COLORS.map((color, i) => (
          <motion.span
            key={color}
            className={`size-1 md:size-1.5 rounded-full ${color}`}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.08,
              type: "spring",
              stiffness: 420,
              damping: 14,
            }}
          />
        ))}
      </div>
      <motion.h2
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: DOT_COLORS.length * 0.08,
          duration: 0.45,
          ease: "easeOut",
        }}
        style={textColor ? { color: textColor } : undefined}
        className={`font-outfit font-medium leading-tight text-[22px] md:text-[30px] lg:text-[42px] ${
          textColor ? "" : light ? "text-white" : "text-thunder"
        }`}
      >
        {children}
      </motion.h2>
    </div>
  );
}
