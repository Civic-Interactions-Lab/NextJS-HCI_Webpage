"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BorderTitle } from "@/components/AppTitle";
import Image from "next/image";
import { LinkButton } from "@/components/AppButton";
import TapeTag from "@/components/TapeTag";
import { Project } from "../../../../../sanity.types";
import Link from "next/link";

interface FeatureProjectsProps {
  projects: Project[];
}

const FeatureProjects = ({ projects }: FeatureProjectsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  const formatAuthors = (authors?: Project["authors"]) => {
    if (!authors || authors.length === 0) return "";

    return authors
      .map((author) => author.name || "")
      .filter((name) => name)
      .join(", ");
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start mt-0 md:mt-12">
        {/* Left side */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            {/* Image container */}
            <div className="relative shadow-lg">
              <Image
                src="/images/cover/6-studio.JPG"
                alt=""
                width={500}
                height={300}
                className="w-full h-64 md:h-80 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <TapeTag position="bottom-right" rotation={-24} color="black">
                <p className="text-xs md:text-sm font-light font-jetbrains-mono leading-tight break-words whitespace-normal max-w-40 md:max-w-48 line-clamp-3">
                  Omar Shakir presenting &quot;Feed-stack&quot; at Temple&apos;s
                  CIS
                </p>
              </TapeTag>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="order-1 lg:order-2 pl-0 lg:pl-8 space-y-6">
          {/* Header with red border */}
          <BorderTitle title="Featured Projects" />

          {/* Project cards */}
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="border-2 border-cyan-700 rounded-bl-[36px] md:rounded-bl-[50px] px-3 md:px-6 py-2 md:py-4 bg-white hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                {/* Blue circle avatar */}
                <div className="flex items-start gap-4">
                  <div className="size-12 md:size-16 bg-cyan-700 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <Link
                      href={project.link || ""}
                      aria-label={project.title}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h4 className="text-sm md:text-lg font-roboto text-gray-900 mb-2 leading-tight underline decoration-gray-300 hover:decoration-gray-600 transition-colors cursor-pointer line-clamp-2">
                        {project.title}
                      </h4>
                    </Link>
                    <p className="text-gray-600 text-xs md:text-sm line-clamp-1">
                      {formatAuthors(project.authors)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Explore button */}
          <LinkButton
            href="/research"
            text="Explore"
            ariaLabel="Explore HCI Research Projects"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default FeatureProjects;
