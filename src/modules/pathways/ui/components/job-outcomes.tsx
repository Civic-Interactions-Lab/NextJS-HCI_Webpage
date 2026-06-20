"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/section-title";
import { COMPANIES, UNIVERSITIES } from "@/modules/pathways/data/pathways-data";

const JOB_TITLES = [
  "Software Engineer",
  "UX/UI Designer",
  "UX Researcher",
  "UX Specialist",
  "Information Architect",
  "Design Researcher",
];

const LogoBadge = ({ name, logo, href }: { name: string; logo: string; href: string }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center p-3 rounded-xl bg-alabaster hover:shadow-sm transition-shadow"
  >
    <div className="relative h-8 w-20">
      <Image src={logo} alt={`${name} logo`} fill className="object-contain" />
    </div>
  </Link>
);

const JobOutcomes = () => (
  <motion.div
    className="flex flex-col gap-6"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="flex flex-col gap-1 max-w-2xl">
      <SectionTitle>Job Outcomes</SectionTitle>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left — job title pills */}
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-outfit font-medium text-lg text-thunder">
            What can you do with HCI experience?
          </p>
          <p className="text-p2 text-thunder/60 mt-1">
            Recent job titles obtained by lab alumni:
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {JOB_TITLES.map((title) => (
            <span
              key={title}
              className="font-outfit text-xs font-medium px-3 py-1.5 rounded-full bg-alabaster border border-thunder/10 text-thunder/70"
            >
              {title}
            </span>
          ))}
        </div>
      </div>

      {/* Right — logos */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-outfit font-medium text-lg text-thunder">
              Where will you work?
            </p>
            <p className="text-p2 text-thunder/60 mt-1">
              Recent companies alumni have joined:
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {COMPANIES.map((c) => (
              <LogoBadge key={c.name} {...c} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <p className="font-outfit font-medium text-lg text-thunder">
              Where will you study next?
            </p>
            <p className="text-p2 text-thunder/60 mt-1">
              Graduate schools alumni have attended:
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {UNIVERSITIES.map((u) => (
              <LogoBadge key={u.name} {...u} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default JobOutcomes;
