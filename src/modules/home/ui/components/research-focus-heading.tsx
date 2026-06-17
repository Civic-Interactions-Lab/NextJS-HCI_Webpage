"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/section-title";

const ResearchFocusHeading = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <SectionTitle>Check out our research focus</SectionTitle>
  </motion.div>
);

export default ResearchFocusHeading;
