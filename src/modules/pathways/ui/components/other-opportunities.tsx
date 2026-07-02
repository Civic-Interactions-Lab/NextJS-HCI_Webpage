"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/section-title";
import { ORGANIZATIONS, sectionFadeUp } from "@/modules/pathways/constants";

const OrgBadge = ({ name, logo, href }: { name: string; logo: string; href: string }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center p-3 rounded-xl bg-white border border-thunder/10 hover:shadow-sm transition-shadow"
  >
    <div className="relative h-10 w-24">
      <Image src={logo} alt={`${name} logo`} fill className="object-contain" />
    </div>
  </Link>
);

const OtherOpportunities = () => (
  <motion.div
    className="-mx-6 md:-mx-12 px-6 md:px-12 py-14 bg-alabaster flex flex-col gap-6"
    {...sectionFadeUp}
  >
    <div className="flex flex-col gap-1 max-w-2xl">
      <SectionTitle>Other Opportunities</SectionTitle>
      <p className="text-p1 text-thunder/65 leading-relaxed mt-2">
        There are other ways to get involved with us. We host the{" "}
        <span className="font-medium text-thunder">OwlHacks</span> hackathon
        here at Temple where you can develop your leadership skills. Our members
        are very involved with{" "}
        <span className="font-medium text-thunder">ACM</span> and{" "}
        <span className="font-medium text-thunder">ACM-W</span> where you can
        learn more about career development. We have also partnered with{" "}
        <span className="font-medium text-thunder">TUDev</span> to provide more
        development skills that extend beyond your classes. So even if we
        don&apos;t have space right now, there are many ways to get involved
        with us.
      </p>
    </div>

    <div className="flex flex-wrap gap-3">
      {ORGANIZATIONS.map((org) => (
        <OrgBadge key={org.name} {...org} />
      ))}
    </div>
  </motion.div>
);

export default OtherOpportunities;
