"use client";

import { BookOpen, Globe, Users } from "lucide-react";
import { motion, Variants } from "framer-motion";

const HciTagsHero = () => {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
  };

  return (
    <div className="flex flex-row items-start space-x-4 md:space-x-6 xl:space-x-12 w-full">
      {/* Main title block */}
      <motion.div
        className="bg-primary-red-800 text-white pl-3 xl:pl-4.5 pb-3 font-bold shrink-0 relative size-36 md:size-48 lg:size-64 xl:size-72 items-end justify-end"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col h-full justify-end">
          <p className="text-xl md:text-4xl xl:text-6xl! font-outfit!">our</p>
          <p className="text-xl md:text-4xl xl:text-6xl! font-outfit!">
            research
          </p>
          <p className="text-xl md:text-4xl xl:text-6xl! font-outfit!">
            focuses
          </p>
        </div>

        <div className="absolute top-0 right-8 md:right-12 xl:right-16 size-8 md:size-12 xl:size-16 bg-white" />
        <div className="absolute top-0 right-0 size-8 md:size-12 xl:size-16 bg-primary-red-950" />
        <div className="absolute top-8 md:top-12 right-0 xl:top-16 size-8 md:size-12 xl:size-16 bg-white" />
      </motion.div>

      <motion.div
        className="flex flex-wrap items-center gap-2 md:gap-4 xl:gap-6"
        initial="hidden"
        animate="visible"
        transition={{
          delayChildren: 0.1,
          staggerChildren: 0.1,
        }}
      >
        {/* Social Computing tag */}
        <motion.div
          className="bg-primary-blue-800 text-white px-2 md:px-4 xl:px-6 py-1 md:py-2 xl:py-3 rounded-2xl text-sm md:text-2xl xl:text-3xl shrink-0 font-medium tracking-wider font-jetbrains-mono uppercase"
          variants={itemVariants}
        >
          Social Computing
        </motion.div>

        <motion.div variants={itemVariants}>
          <Users className="size-6 md:size-11 xl:size-16" />
        </motion.div>

        {/* GenAI tag */}
        <motion.div
          className="bg-primary-yellow-800 px-2 md:px-4 xl:px-6 py-1 md:py-2 xl:py-3 rounded-full text-sm md:text-2xl xl:text-3xl font-medium tracking-wide shrink-0 font-roboto"
          variants={itemVariants}
        >
          GenAI & Education
        </motion.div>

        <motion.div variants={itemVariants}>
          <BookOpen className="size-6 md:size-11 xl:size-16" />
        </motion.div>

        {/* Accessible Technology tag */}
        <motion.div
          className="bg-primary-green-800 text-white px-2 md:px-4 xl:px-6 py-1 md:py-2 xl:py-3 rounded-2xl text-sm md:text-2xl xl:text-3xl font-semibold shrink-0 font-outfit"
          variants={itemVariants}
        >
          Accessible Technology
        </motion.div>

        <motion.div variants={itemVariants}>
          <Globe className="size-6 md:size-11 xl:size-16" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HciTagsHero;
