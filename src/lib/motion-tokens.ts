import type { Variants } from "framer-motion";

/**
 * Shared animation primitives and variants, imported directly by components
 * so animation timing and motion stays consistent site-wide.
 */

export const motionDuration = {
  fast: 0.3,
  base: 0.45,
  slow: 0.6,
} as const;

export const motionEase = "easeOut" as const;

export const motionStagger = 0.1;

export const motionOffsetY = 24;

/** Default scroll-trigger viewport: fires once, 10% of the element visible. */
export const motionViewport = { once: true, amount: 0.1 } as const;

/** Home module's scroll-trigger viewport: fires once, 80px before entering. */
export const motionViewportMargin = { once: true, margin: "-80px" } as const;

/** Fade up + in. Used with `initial`/`whileInView` or `initial`/`animate`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: motionOffsetY },
  visible: { opacity: 1, y: 0, transition: { duration: motionDuration.base, ease: motionEase } },
};

/** Staggers children's `fadeUp` (or other) variants on enter. */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: motionStagger } },
};
