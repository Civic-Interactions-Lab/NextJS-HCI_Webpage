"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { fadeUp, stagger, motionViewport } from "@/lib/motion-tokens";

// Placeholder progress until this is wired to a real donation total.
const FUNDRAISER_GOAL = 10000;
const FUNDRAISER_RAISED = 6240;

const FUNDRAISER_TIERS = [
  {
    id: "pizza",
    amount: "$15",
    description: "Buy the lab a pizza for a late-night deadline crunch",
  },
  {
    id: "coffee",
    amount: "$25",
    description: "Coffee run for the whole team during finals week",
  },
  {
    id: "sensor",
    amount: "$50",
    description: "New sensor or prototype part for a student project",
  },
  {
    id: "conference",
    amount: "$100",
    description: "Help send a student to present at a conference",
  },
  {
    id: "scholar",
    amount: "$250",
    description: "Sponsor a research scholar for a semester",
  },
  {
    id: "stipend",
    amount: "$500+",
    description: "Fund a full undergrad research stipend",
  },
];

const SEGMENT_COUNT = 30;
const PERCENT_FUNDED = Math.min(
  Math.round((FUNDRAISER_RAISED / FUNDRAISER_GOAL) * 100),
  100,
);
const FILLED_SEGMENTS = Math.round((PERCENT_FUNDED / 100) * SEGMENT_COUNT);

const FuelNextGeneration = () => (
  <motion.section
    className="flex flex-col gap-6"
    initial="hidden"
    whileInView="visible"
    viewport={motionViewport}
    variants={fadeUp}
  >
    <div className="flex flex-col gap-2 max-w-2xl">
      <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest">
        Give Back
      </p>
      <SectionTitle>Fuel the Next Generation</SectionTitle>
      <p className="text-p1 text-thunder/65 leading-relaxed">
        Help fund the next student&apos;s big idea — every dollar goes straight to student
        research, conference travel, and the occasional very necessary pizza.
      </p>
    </div>

    <div className="rounded-3xl border border-thunder/10 p-6 md:p-10 flex flex-col gap-6">
      <motion.ul
        role="list"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={stagger}
      >
        {FUNDRAISER_TIERS.map((tier) => (
          <motion.li key={tier.id} variants={fadeUp} className="list-none">
            <Link
              href="https://giving.temple.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 h-full rounded-2xl border border-thunder/10 bg-white p-4 transition-colors hover:border-well-red/30 hover:shadow-sm"
            >
              <span className="font-outfit font-semibold text-lg text-well-red">
                {tier.amount}
              </span>
              <span className="font-outfit text-sm text-thunder/65 leading-snug">
                {tier.description}
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <Link
        href="https://giving.temple.edu"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 self-start rounded-full bg-well-red px-6 py-3 font-outfit text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <Heart className="w-4 h-4" />
        Donate to the HCI Lab
        <ArrowRight className="w-4 h-4" />
      </Link>

      <div className="pt-6 border-t border-thunder/10 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <span className="font-jetbrains-mono text-xs text-thunder/40 tracking-wide">
            loading_next_generation …
          </span>
          <span className="font-outfit text-sm text-thunder/70">
            <span className="font-semibold text-well-red">
              ${FUNDRAISER_RAISED.toLocaleString()}
            </span>{" "}
            raised of ${FUNDRAISER_GOAL.toLocaleString()} goal
          </span>
        </div>

        <div
          role="progressbar"
          aria-valuenow={PERCENT_FUNDED}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Fundraiser progress"
          className="flex gap-1"
        >
          {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i < FILLED_SEGMENTS ? "bg-well-red" : "bg-thunder/10"
              }`}
            />
          ))}
        </div>

        <span className="font-outfit text-xs text-thunder/50">
          {PERCENT_FUNDED}% funded
        </span>
      </div>
    </div>
  </motion.section>
);

export default FuelNextGeneration;
