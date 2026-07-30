"use client";

import { motion, type Variants } from "framer-motion";
import { SectionTitle } from "@/components/section-title";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const gridViewport = { once: true, amount: 0.1 } as const;

const PRICING_TIERS = [
  {
    id: "supporter",
    title: "Supporter",
    price: "$1,000",
    description:
      "Sponsors a student's research stipend or conference trip. Your name is listed on our website and annual report.",
    perks: ["Name listed on website", "Name in annual report"],
  },
  {
    id: "partner",
    title: "Partner",
    price: "$2,000",
    includes: "Includes Supporter perks",
    description:
      "Logo on lab merch, access to students' emails (with their consent), and an invitation to meet students.",
    perks: ["Logo on lab merch", "Student email access (with consent)", "Invitation to meet students"],
  },
  {
    id: "champion",
    title: "Champion",
    price: "$5,000",
    includes: "Includes Partner perks",
    description:
      "A sponsor spotlight post and the option to name a student award at the annual ACM dinner we host.",
    perks: ["Sponsor spotlight post", "Named student award at ACM dinner"],
  },
];

const SponsorshipTiers = () => (
  <section aria-label="Temple HCI Lab sponsorship tiers" className="flex flex-col gap-4">
    <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest">
      Sponsorship Tiers
    </p>

    <motion.ul
      role="list"
      className="flex flex-col gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={gridViewport}
      variants={stagger}
    >
      {PRICING_TIERS.map((tier, i) => (
        <motion.li key={tier.id} variants={fadeUp} className="list-none flex flex-col gap-3">
          <SectionTitle>{tier.title}</SectionTitle>

          <div className={`rounded-2xl border border-thunder/10 p-6 md:p-8 flex flex-col gap-4 ${i % 2 === 1 ? "" : "bg-white shadow-sm"}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="font-outfit font-medium text-2xl text-well-red">
                {tier.price}
              </span>
              {tier.includes && (
                <p className="font-outfit text-xs font-medium text-thunder/40 uppercase tracking-widest">
                  {tier.includes}
                </p>
              )}
            </div>

            <p className="text-p1 text-thunder/65 leading-relaxed max-w-2xl">
              {tier.description}
            </p>

            <ul className="flex flex-col gap-1.5">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-well-red shrink-0" aria-hidden="true" />
                  <span className="font-outfit text-sm text-thunder/70">{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  </section>
);

export default SponsorshipTiers;
