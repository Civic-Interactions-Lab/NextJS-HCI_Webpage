"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/section-title";

const sectionFadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const ORGANIZATIONS = [
  {
    name: "OwlHacks",
    logo: "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_photos/002/962/488/datas/original.PNG",
    href: "https://www.owlhacks.com",
  },
  {
    name: "ACM",
    logo: "https://www.owlhacks.com/endorsement_logo/ACM.svg",
    href: "https://acm.temple.edu",
  },
  {
    name: "TUDev",
    logo: "https://cis.temple.edu/assets/img/thumbnail/student-org-tudev.jpg",
    href: "https://tudev.org",
  },
  {
    name: "Code for Philly",
    logo: "https://spiritnews.org/wp-content/uploads/2016/05/code-for-philly-copy.jpg",
    href: "https://codeforphilly.org",
  },
  {
    name: "PhillyCHI",
    logo: "https://images.squarespace-cdn.com/content/63b43c38ed9f2c0a9819b8d3/dce92198-d18a-4d74-812b-8185895f30fe/Logo+Horizotal+BW+1.png?format=1500w&content-type=image%2Fpng",
    href: "https://phillychi.org",
  },
];

const OrgBadge = ({
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
    className="flex items-center justify-center p-3 rounded-xl bg-white border border-thunder/10 hover:shadow-sm transition-shadow"
  >
    <div className="relative h-10 w-24">
      <Image src={logo} alt={`${name} logo`} fill className="object-contain" />
    </div>
  </Link>
);

const OtherOpportunities = () => (
  <motion.div
    className="-mx-6 md:-mx-12 px-6 md:px-12 flex flex-col gap-6"
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
