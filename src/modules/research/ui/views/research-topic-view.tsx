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
import FeaturedVideo from "@/modules/research/ui/components/featured-video";
import { useStaggerFade } from "@/modules/research/hooks/use-stagger-fade";

const CATEGORIES = [
  {
    label: "Gen AI & Education",
    tagline:
      "Generative AI in education is the use of advanced AI tools that can create text, images, code, and other content to support teaching and learning.",
    description:
      "Our Gen AI & Education research investigates how large language models and generative AI tools are transforming teaching, learning, and assessment in computer science and beyond. We study how students use AI for coding assistance, writing, and problem-solving — examining both the benefits and risks, from reduced cognitive load to over-reliance and academic integrity concerns. Our work informs the design of scaffolded AI tools that promote critical thinking, metacognition, and genuine understanding rather than surface-level productivity.",
    videoUrl: "https://www.youtube.com/embed/Pq-d6wipGRQ",
    videoTitle: "AI-Powered Learning Revolution",
    videoDescription:
      "Discover how generative AI is transforming education through personalized learning experiences, automated content creation, and intelligent tutoring systems that adapt to each student's unique learning style and pace.",
    accent: "bg-well-red",
    href: "/research/gen-ai-education",
  },
  {
    label: "Accessibility Technology",
    tagline:
      "Accessibility technology empowers everyone to connect, create, and participate — no barriers, just possibilities.",
    description:
      "Our Accessibility Technology research focuses on building and studying tools that remove barriers for people with disabilities — particularly in communication, education, and everyday digital life. We design and evaluate augmentative and alternative communication (AAC) systems, screen reader interfaces, and adaptive input methods. Our work is grounded in participatory design with disabled communities, ensuring that the people who use these tools shape how they are built. We publish at ASSETS and CHI, and collaborate with clinicians, educators, and disability advocates.",
    videoUrl: "https://www.youtube.com/embed/QuJmaYuhKH0",
    videoTitle: "Breaking Barriers with Accessible Technology",
    videoDescription:
      "Explore our innovative approaches to creating inclusive digital experiences that empower users with disabilities through voice interfaces, haptic feedback, and adaptive technologies that make technology accessible to everyone.",
    accent: "bg-sky",
    href: "/research/accessibility-technology",
  },
  {
    label: "Future of Work",
    tagline:
      "The future of work reimagines how people collaborate, communicate, and thrive through technology.",
    description:
      "Our Future of Work research explores how emerging technologies are reshaping professional life — from AI-assisted decision-making and remote collaboration tools to the changing nature of expertise and autonomy in the workplace. We investigate how workers adapt to intelligent systems, how organizations can design workflows that amplify human capability rather than replace it, and what it means to find meaning and agency in an increasingly automated world. Our work bridges HCI, organizational behavior, and AI ethics to inform the design of workplaces that are more humane, equitable, and effective.",
    videoUrl: "https://www.youtube.com/embed/pUbHCAl1vco",
    videoTitle: "The Future of Work",
    videoDescription:
      "Learn about our groundbreaking research in collaborative platforms, digital wellbeing, and virtual communities reshaping how people connect and solve problems together.",
    accent: "bg-grass",
    href: "/research/future-of-work",
  },
];

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
