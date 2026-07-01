"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { People } from "../../../../../sanity.types";
import { SectionTitle } from "@/components/section-title";
import PersonCard from "@/modules/people/ui/components/person-card";
import { PEOPLE_NAV_LINKS, fadeUp, stagger, gridViewport } from "@/modules/people/constants";
import { useNavCardReveal } from "@/modules/people/hooks/use-nav-card-reveal";

const AlumniView = ({ alumni }: { alumni: People[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const navLinks = PEOPLE_NAV_LINKS.filter((link) => link.href !== "/people/alumni");

  useNavCardReveal(ref);

  return (
    <div ref={ref} className="space-y-16">
      {alumni.length === 0 ? (
        <p className="text-p1 text-thunder/50 py-12">No alumni found.</p>
      ) : (
        <motion.ul
          role="list"
          aria-label="Temple HCI Lab alumni"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={gridViewport}
          variants={stagger}
        >
          {alumni.map((person) => (
            <motion.li key={person._id} variants={fadeUp} className="list-none">
              <PersonCard person={person} />
            </motion.li>
          ))}
        </motion.ul>
      )}

      <nav aria-label="Other Temple HCI Lab people pages" className="border-t border-thunder/8">
        {navLinks.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            aria-label={`View ${link.label} — Temple HCI Lab`}
            className={`people-nav-card group flex flex-col gap-3 py-8 border-b border-thunder/8 ${i % 2 === 1 ? "-mx-6 md:-mx-12 px-6 md:px-12 bg-alabaster" : ""}`}
          >
            <SectionTitle>{link.label}</SectionTitle>
            <p className="text-p1 text-thunder/60 leading-relaxed max-w-xl">
              {link.tagline}
            </p>
            <span className="inline-flex items-center gap-1.5 font-outfit text-sm font-semibold uppercase tracking-widest text-thunder group-hover:text-well-red transition-colors w-fit mt-1">
              View {link.label}{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AlumniView;
