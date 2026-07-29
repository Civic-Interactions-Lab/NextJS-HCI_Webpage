import { type Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export const gridViewport = { once: true, amount: 0.1 } as const;

export const quoteReveal: Variants = {
  rest: { height: 0, opacity: 0, marginTop: 0 },
  hover: {
    height: "auto",
    opacity: 1,
    marginTop: 4,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};
