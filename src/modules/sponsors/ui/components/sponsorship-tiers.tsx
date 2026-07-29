"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/section-title";
import { PRICING_TIERS, fadeUp, stagger, gridViewport } from "@/modules/sponsors/constants";

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
