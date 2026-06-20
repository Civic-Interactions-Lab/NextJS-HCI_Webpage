"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { People } from "../../../../../sanity.types";
import { SectionTitle } from "@/components/section-title";
import CollaboratorCard from "@/modules/people/ui/components/collaborator-card";

gsap.registerPlugin(ScrollTrigger);

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const PEOPLE_LINKS = [
  { label: "Current Members", href: "/people", tagline: "PhD candidates, master's students, undergraduate researchers, and Research Scholars — the people driving our work." },
  { label: "Alumni", href: "/people/alumni", tagline: "Former lab members who have gone on to careers in industry, academia, and beyond." },
];

const CollaboratorsView = ({ collaborators }: { collaborators: People[] }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".people-nav-card", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".people-nav-card",
          start: "top bottom",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="space-y-16">
      {collaborators.length === 0 ? (
        <p className="text-p1 text-thunder/50 py-12">No collaborators found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {collaborators.map((person) => (
            <motion.div key={person._id} variants={cardVariants}>
              <CollaboratorCard person={person} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="border-t border-thunder/8">
        {PEOPLE_LINKS.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            className={`people-nav-card group flex flex-col gap-3 py-8 border-b border-thunder/8 ${i % 2 === 1 ? "-mx-6 md:-mx-12 px-6 md:px-12 bg-alabaster" : ""}`}
          >
            <SectionTitle>{link.label}</SectionTitle>
            <p className="text-p1 text-thunder/60 leading-relaxed max-w-xl">
              {link.tagline}
            </p>
            <span className="inline-flex items-center gap-1.5 font-outfit text-sm font-semibold uppercase tracking-widest text-thunder group-hover:text-well-red transition-colors w-fit mt-1">
              View {link.label}{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorsView;
