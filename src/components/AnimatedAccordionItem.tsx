"use client";

import { motion } from "framer-motion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AnimatedAccordionItem = ({
  topic,
  content,
  index,
}: {
  topic?: string;
  content?: string;
  index: number;
}) => {
  if (!topic || !content) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      <AccordionItem
        key={index}
        value={topic}
        className="rounded-4xl shadow-lg"
      >
        <AccordionTrigger className="px-6 py-2 md:py-4 !bg-white !border-2 !rounded-full text-left !text-sm md:!text-lg lg:!text-xl font-medium shadow shadow-gray-300 font-jetbrains-mono">
          {topic}
        </AccordionTrigger>
        {content && (
          <AccordionContent className="px-6 py-5 text-gray-700 leading-relaxed text-sm md:text-base lg:text-lg font-roboto">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </AccordionContent>
        )}
      </AccordionItem>
    </motion.div>
  );
};

export default AnimatedAccordionItem;
