"use client";

import { useRef } from "react";
import { useStaggerFade } from "@/modules/research/hooks/use-stagger-fade";
import { RESEARCH_CATEGORIES } from "@/modules/research/constants/research-categories";
import { ResearchTopicLabel } from "@/modules/research/ui/components/research-hero";

export type FeaturedVideoVariant = "overview" | ResearchTopicLabel;

const OverviewFeaturedVideo = () => {
  const ref = useRef<HTMLDivElement>(null);
  useStaggerFade(ref, ".featured-video", { y: 40, duration: 0.8, stagger: 0 });

  return (
    <div ref={ref}>
      <figure className="featured-video flex flex-col lg:flex-row gap-8 pt-12">
        <div className="w-full lg:w-1/2 shrink-0">
          <iframe
            src="https://www.youtube.com/embed/-s1_uc-BPqs"
            title="Temple HCI Lab — Research Overview"
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
            A look inside the Temple HCI Lab — our people, our projects, and
            the questions driving our research at the intersection of humans
            and technology.
          </p>
        </figcaption>
      </figure>
    </div>
  );
};

const GenAIFeaturedVideo = () => {
  const ref = useRef<HTMLDivElement>(null);
  useStaggerFade(ref, ".featured-video", { y: 40, duration: 0.8, stagger: 0 });
  const cat = RESEARCH_CATEGORIES.find((c) => c.label === "Gen AI & Education")!;

  if (!cat.videoUrl) return null;

  return (
    <div ref={ref}>
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
    </div>
  );
};

const AccessibilityFeaturedVideo = () => {
  const ref = useRef<HTMLDivElement>(null);
  useStaggerFade(ref, ".featured-video", { y: 40, duration: 0.8, stagger: 0 });
  const cat = RESEARCH_CATEGORIES.find((c) => c.label === "Accessibility Technology")!;

  if (!cat.videoUrl) return null;

  return (
    <div ref={ref}>
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
    </div>
  );
};

const FutureOfWorkFeaturedVideo = () => {
  const ref = useRef<HTMLDivElement>(null);
  useStaggerFade(ref, ".featured-video", { y: 40, duration: 0.8, stagger: 0 });
  const cat = RESEARCH_CATEGORIES.find((c) => c.label === "Future of Work")!;

  if (!cat.videoUrl) return null;

  return (
    <div ref={ref}>
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
    </div>
  );
};

interface FeaturedVideoProps {
  variant: FeaturedVideoVariant;
}

const FeaturedVideo = ({ variant }: FeaturedVideoProps) => {
  switch (variant) {
    case "overview":
      return <OverviewFeaturedVideo />;
    case "Gen AI & Education":
      return <GenAIFeaturedVideo />;
    case "Accessibility Technology":
      return <AccessibilityFeaturedVideo />;
    case "Future of Work":
      return <FutureOfWorkFeaturedVideo />;
  }
};

export default FeaturedVideo;
