"use client";

import { motion } from "framer-motion";
import { FaqsQueryResult } from "../../../../../sanity.types";
import { SectionTitle } from "@/components/section-title";
import { fadeUp, stagger, motionViewport } from "@/lib/motion-tokens";

interface JoinFaqListProps {
  faqs: FaqsQueryResult;
}

const JoinFaqList = ({ faqs }: JoinFaqListProps) => (
  <section className="max-w-5xl mx-auto" aria-label="Frequently asked questions about joining the Temple HCI Lab">
    <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest mb-6">
      Frequently Asked Questions
    </p>

    <motion.dl
      className="border-t border-thunder/8"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={stagger}
    >
      {faqs.map((faq) => (
        <motion.div
          key={faq._id}
          variants={fadeUp}
          className="py-8 border-b border-thunder/8"
        >
          <dt>
            <SectionTitle>{faq.question ?? ""}</SectionTitle>
          </dt>
          <dd
            className="mt-3 text-p1 text-thunder/65 leading-relaxed w-full [&_a]:text-well-red [&_a]:underline [&_a]:hover:opacity-70"
            dangerouslySetInnerHTML={{ __html: faq.answer ?? "" }}
          />
        </motion.div>
      ))}
    </motion.dl>
  </section>
);

export default JoinFaqList;
