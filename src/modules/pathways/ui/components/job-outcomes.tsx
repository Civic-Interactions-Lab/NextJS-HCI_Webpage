"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/section-title";
import {
  COMPANIES,
  UNIVERSITIES,
  JOB_TITLES,
  sectionFadeUp,
} from "@/modules/pathways/constants";

const LogoBadge = ({
  name,
  logo,
  href,
}: {
  name: string;
  logo: string;
  href: string;
}) => (
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
  <motion.div className="flex flex-col gap-6" {...sectionFadeUp}>
    <SectionTitle>Job Outcomes</SectionTitle>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      {/* Left — description text */}
      <div>
        <p className="text-p1 text-thunder/65 leading-relaxed">
          Doing research in the Temple HCI Lab prepares students for a wide range
          of careers by developing skills that extend far beyond technical
          expertise. By working on complex, open-ended problems, students learn
          resilience, creativity, and design thinking. By collaborating with
          teammates and interdisciplinary partners, students develop leadership,
          communication, and project management skills. Through designing,
          building, and evaluating new technologies, students learn to make
          informed decisions, balance opportunities and risks, and develop an
          entrepreneurial mindset. These experiences prepare students for careers
          in user experience design, product management, software development,
          artificial intelligence, data science, research, and other
          technology-focused fields.
        </p>
      </div>

      {/* Right — job titles + logos */}
      <div className="flex flex-col gap-6">
        {/* Job title pills */}
        <div className="flex flex-col gap-3">
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

        {/* Company logos */}
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

        {/* University logos */}
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
