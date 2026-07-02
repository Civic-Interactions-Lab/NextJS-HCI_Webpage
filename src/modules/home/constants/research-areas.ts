import { BrainCircuit, PersonStanding, WandSparkles } from "lucide-react";

export const RESEARCH_AREAS = [
  {
    id: "computing-education",
    title: "Gen AI & Education",
    href: "/research/gen-ai-education",
    Icon: BrainCircuit,
    description: "Studying AI harms and building scaffolding for responsible use.",
  },
  {
    id: "assistive-tech",
    title: "Accessibility Technology",
    href: "/research/accessibility-technology",
    Icon: PersonStanding,
    description: "AAC tools to foster self-direction and expressive communication.",
  },
  {
    id: "future-of-work",
    title: "Future of Work",
    href: "/research/future-of-work",
    Icon: WandSparkles,
    description: "Tools to build better workplaces and reimagine how we work.",
  },
] as const;
