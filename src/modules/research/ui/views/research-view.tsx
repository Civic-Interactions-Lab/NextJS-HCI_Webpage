"use client";

import { useRef } from "react";
import ResearchHero from "@/modules/research/ui/components/research-hero";
import ResearchHeroLogo from "@/modules/research/ui/components/research-hero-logo";
import NavCardsList from "@/components/nav-cards-list";
import CtaBanner from "@/components/cta-banner";
import { CATEGORIES } from "@/modules/research/constants";
import FeaturedVideo from "@/modules/research/ui/components/featured-video";
import { useStaggerFade } from "@/modules/research/hooks/use-stagger-fade";

export default function ResearchView() {
  const ref = useRef<HTMLDivElement>(null);

  useStaggerFade(ref, ".featured-video", { y: 40, duration: 0.8, stagger: 0 });

  return (
    <div ref={ref} className="space-y-32">
      <ResearchHero
        ariaLabel="Temple HCI Lab research overview"
        title={
          <>
            Human. Technology. <span className="text-well-red">Impact.</span>
          </>
        }
        paragraphs={[
          {
            content: (
              <>
                <span className="font-semibold text-thunder">
                  Here at the Temple HCI Lab,
                </span>{" "}
                we study how people learn, communicate, and collaborate with
                technology. Our work brings together perspectives from human-computer
                interaction, communication, learning sciences, and participatory
                design to address real-world challenges in education, accessibility,
                and artificial intelligence. We take a pragmatic approach to
                technology — rather than viewing AI and emerging technologies as
                inherently beneficial or harmful, we seek to understand how their
                design shapes human experiences, relationships, and opportunities.
              </>
            ),
          },
          {
            content:
              "We believe technology should be evaluated not only by what it can do, but by how it affects the people and communities who use it. We are especially sensitive to uncovering the potential harms of AI systems such as social displacement and disruptions to metacognitive processes.",
          },
        ]}
        logo={<ResearchHeroLogo />}
      />

      <FeaturedVideo
        src="https://www.youtube.com/embed/-s1_uc-BPqs"
        title="Temple HCI Lab — Research Overview"
        description="A look inside the Temple HCI Lab — our people, our projects, and the questions driving our research at the intersection of humans and technology."
      />

      {/* Category sections */}
      <NavCardsList
        ariaLabel="Temple HCI Lab research topics"
        items={CATEGORIES}
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
