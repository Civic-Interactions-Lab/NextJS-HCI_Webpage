import { getFutureOfWorkResearch } from "@/sanity/lib/research/getResearch";
import ResearchTopicView from "@/modules/research/ui/views/research-topic-view";

const cat = {
  label: "Future of Work",
  tagline:
    "The future of work reimagines how people collaborate, communicate, and thrive through technology.",
  description:
    "Our Future of Work research explores how emerging technologies are reshaping professional life — from AI-assisted decision-making and remote collaboration tools to the changing nature of expertise and autonomy in the workplace. We investigate how workers adapt to intelligent systems, how organizations can design workflows that amplify human capability rather than replace it, and what it means to find meaning and agency in an increasingly automated world. Our work bridges HCI, organizational behavior, and AI ethics to inform the design of workplaces that are more humane, equitable, and effective.",
  accent: "bg-grass",
};

export default async function FutureOfWorkPage() {
  const research = await getFutureOfWorkResearch();
  return (
    <ResearchTopicView
      label={cat.label}
      tagline={cat.tagline}
      description={cat.description}
      accent={cat.accent}
      research={research}
    />
  );
}
