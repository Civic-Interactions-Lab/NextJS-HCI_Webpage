"use client";

import { motion } from "framer-motion";
import { FaqsQueryResult } from "../../../../../sanity.types";
import ViewIntroHeader from "@/components/view-intro-header";
import { SectionTitle } from "@/components/section-title";
import { fadeUp, stagger, faqViewport } from "@/modules/join/constants";
import CtaBanner from "@/components/cta-banner";

interface JoinViewProps {
  faqs: FaqsQueryResult;
}

const JoinView = ({ faqs }: JoinViewProps) => (
  <div className="space-y-16">
    <ViewIntroHeader
      label="Join the Lab"
      titlePrefix="Have questions before"
      titleAccent="joining us?"
      body="We welcome undergraduate and graduate students who are curious, driven, and passionate about human-centered design, AI, accessibility, and social computing. Here's everything you need to know before applying."
      imageSrc="/images/cover/HCI_OpenHouse-5.jpg"
      imageAlt="Students collaborating in the Temple HCI Lab studio"
    />

    {/* FAQ */}
    <section aria-label="Frequently asked questions about joining the Temple HCI Lab">
      <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest mb-6">
        Frequently Asked Questions
      </p>

      <motion.dl
        className="border-t border-thunder/8"
        initial="hidden"
        whileInView="visible"
        viewport={faqViewport}
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
              className="mt-3 text-p1 text-thunder/65 leading-relaxed max-w-2xl [&_a]:text-well-red [&_a]:underline [&_a]:hover:opacity-70"
              dangerouslySetInnerHTML={{ __html: faq.answer ?? "" }}
            />
          </motion.div>
        ))}
      </motion.dl>
    </section>

    <CtaBanner
      label="Ready to Apply?"
      title="Join the Temple HCI Lab."
      body="We welcome undergraduate and graduate students passionate about human-centered design, AI, accessibility, and social computing."
      ctaLabel="Apply Now"
      ctaHref="https://docs.google.com/forms/d/e/1FAIpQLScuzv5spPPiuG0sSvb7KFvMucBhJtgParffTVDwC7dWefcCMQ/viewform"
    />
  </div>
);

export default JoinView;
