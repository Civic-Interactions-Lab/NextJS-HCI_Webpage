"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Research } from "../../../../../sanity.types";
import ResearchCard from "@/modules/research/ui/components/research-card";
import ResearchHero from "@/modules/research/ui/components/research-hero";
import NavCardsList from "@/components/nav-cards-list";
import CtaBanner from "@/components/cta-banner";
import TopicLogoGenAI from "@/modules/research/ui/components/topic-logo-gen-ai";
import TopicLogoAccessibility from "@/modules/research/ui/components/topic-logo-accessibility";
import TopicLogoSocial from "@/modules/research/ui/components/topic-logo-social";
import { CATEGORIES, fadeUp, stagger, gridViewport } from "@/modules/research/constants";
import { useStaggerFade } from "@/modules/research/hooks/use-stagger-fade";

const LOGO_MAP: Record<string, React.ReactNode> = {
  "Gen AI & Education": <TopicLogoGenAI />,
  "Accessibility Technology": <TopicLogoAccessibility />,
  "Future of Work": <TopicLogoSocial />,
};

interface ResearchTopicViewProps {
  label: string;
  tagline: string;
  description: string;
  accent: string;
  research: Research[];
}

const ResearchTopicView = ({
  label,
  tagline,
  description,
  research,
}: ResearchTopicViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const otherCategories = CATEGORIES.filter((c) => c.label !== label);
  const cat = CATEGORIES.find((c) => c.label === label);

  useStaggerFade(ref, ".featured-video", { y: 40, duration: 0.8, stagger: 0 });

  return (
    <div ref={ref} className="space-y-20">
      <ResearchHero
        ariaLabel={`${label} research at the Temple HCI Lab`}
        title={
          <>
            {label.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-well-red">
              {label.split(" ").slice(-1)[0]}
            </span>
          </>
        }
        paragraphs={[
          {
            content: <>&ldquo;{tagline}&rdquo;</>,
            className: "text-thunder/60 italic",
          },
          { content: description },
        ]}
        logo={LOGO_MAP[label]}
      />

      {/* Papers grid */}
      {research.length > 0 ? (
        <section aria-label={`Published papers in ${label}`} className="pt-12">
          <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest mb-6">
            Our papers in {label}
          </p>
          <motion.ul
            role="list"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={gridViewport}
            variants={stagger}
          >
            {research.map((r) => (
              <motion.li key={r._id} variants={fadeUp} className="list-none">
                <ResearchCard research={r} />
              </motion.li>
            ))}
          </motion.ul>
        </section>
      ) : (
        <div className="py-14">
          <p className="text-p1 text-thunder/50">
            No papers yet for this category.
          </p>
        </div>
      )}

      {/* Featured video */}
      {cat?.videoUrl && (
        <figure className="featured-video flex flex-col lg:flex-row gap-8 pt-12">
          <div className="w-full lg:w-1/2 shrink-0">
            <iframe
              src={cat.videoUrl}
              title={cat.videoTitle}
              className="w-full aspect-video rounded-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <figcaption className="flex flex-col justify-center gap-3">
            <p className="font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
              Featured
            </p>
            <p className="font-outfit font-medium text-xl text-thunder leading-snug">
              {cat.videoTitle}
            </p>
            <p className="text-p1 text-thunder/65 leading-relaxed">
              {cat.videoDescription}
            </p>
          </figcaption>
        </figure>
      )}

      {/* Other topics */}
      <NavCardsList
        ariaLabel="Other Temple HCI Lab research topics"
        items={otherCategories}
        linkDescription={(item) => `Learn more about ${item.label} research at the Temple HCI Lab`}
      />

      <CtaBanner
        label="Get Involved"
        title="Interested in joining our research?"
        body="The Temple HCI Lab welcomes undergraduate and graduate students who are passionate about human-centered design, AI, accessibility, and social computing. Apply to join and help shape the future of HCI research."
        ctaLabel="Apply to join"
        ctaHref="/join"
      />
    </div>
  );
};

export default ResearchTopicView;
