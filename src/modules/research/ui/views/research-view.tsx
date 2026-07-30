"use client";

import { useRef } from "react";
import ResearchHero from "@/modules/research/ui/components/research-hero";
import ResearchHeroLogo from "@/modules/research/ui/components/research-hero-logo";
import NavCardsList from "@/components/nav-cards-list";
import CtaBanner from "@/components/cta-banner";
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
