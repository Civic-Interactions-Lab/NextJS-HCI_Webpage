"use client";

import { useRef } from "react";
import { Research } from "../../../../../sanity.types";
import ResearchHero from "@/modules/research/ui/components/research-hero";
import NavCardsList from "@/components/nav-cards-list";
import CtaBanner from "@/components/cta-banner";
import TopicLogoGenAI from "@/modules/research/ui/components/topic-logo-gen-ai";
import TopicLogoAccessibility from "@/modules/research/ui/components/topic-logo-accessibility";
import TopicLogoSocial from "@/modules/research/ui/components/topic-logo-social";
import ResearchGrid from "@/modules/research/ui/components/research-grid";
import { CATEGORIES } from "@/modules/research/constants";
import FeaturedVideo from "@/modules/research/ui/components/featured-video";
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

export default function ResearchTopicView({
  label,
  tagline,
  description,
  research,
}: ResearchTopicViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const otherCategories = CATEGORIES.filter((c) => c.label !== label);
  const cat = CATEGORIES.find((c) => c.label === label);

  useStaggerFade(ref, ".featured-video", { y: 40, duration: 0.8, stagger: 0 });

  return (
    <div ref={ref} className="space-y-32">
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

      <ResearchGrid label={label} research={research} />

      {cat?.videoUrl && (
        <FeaturedVideo
          src={cat.videoUrl}
          title={cat.videoTitle}
          description={cat.videoDescription}
        />
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
}
