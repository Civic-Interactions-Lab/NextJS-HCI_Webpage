"use client";

import { useRef } from "react";
import ResearchHero from "@/modules/research/ui/components/research-hero";
import ResearchHeroLogo from "@/modules/research/ui/components/research-hero-logo";
import NavCardsList from "@/components/nav-cards-list";
import CtaBanner from "@/components/cta-banner";
import { CATEGORIES } from "@/modules/research/constants";
import { useStaggerFade } from "@/modules/research/hooks/use-stagger-fade";

const ResearchView = () => {
  const ref = useRef<HTMLDivElement>(null);

  useStaggerFade(ref, ".featured-video", { y: 40, duration: 0.8, stagger: 0 });

  return (
    <div ref={ref} className="space-y-20">
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

      {/* Teaser video */}
      <figure className="featured-video flex flex-col lg:flex-row gap-8 pt-12">
        <div className="w-full lg:w-1/2 shrink-0">
          <iframe
            src="https://www.youtube.com/embed/-s1_uc-BPqs"
            title="Temple HCI Lab — Teaser"
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
            Temple HCI Lab — Research Overview
          </p>
          <p className="text-p1 text-thunder/65 leading-relaxed">
            A look inside the Temple HCI Lab — our people, our projects, and the
            questions driving our research at the intersection of humans and
            technology.
          </p>
        </figcaption>
      </figure>

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
};

export default ResearchView;
