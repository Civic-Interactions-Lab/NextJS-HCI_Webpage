"use client";

import { motion } from "framer-motion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AnimatedAccordionItem = ({
  item,
  index,
}: {
  item: {
    topic: string;
    content: string;
    defaultOpen?: boolean;
  };
  index: number;
}) => {
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
        value={item.topic}
        className="rounded-4xl shadow-lg"
      >
        <AccordionTrigger className="px-6 py-5 !bg-white !border-2 !rounded-full text-left !text-base md:!text-2xl font-medium shadow shadow-gray-300">
          {item.topic}
        </AccordionTrigger>
        {item.content && (
          <AccordionContent className="px-6 py-5 text-gray-700 leading-relaxed text-sm md:text-lg">
            {item.content}
          </AccordionContent>
        )}
      </AccordionItem>
    </motion.div>
  );
};

export default AnimatedAccordionItem;
