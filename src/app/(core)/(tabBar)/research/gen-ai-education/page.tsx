import { getGenAIEducationResearch } from "@/sanity/lib/research/getResearch";
import ResearchTopicView from "@/modules/research/ui/views/research-topic-view";

const cat = {
  label: "Gen AI & Education",
  tagline:
    "Generative AI in education is the use of advanced AI tools that can create text, images, code, and other content to support teaching and learning.",
  description:
    "Our Gen AI & Education research investigates how large language models and generative AI tools are transforming teaching, learning, and assessment in computer science and beyond. We study how students use AI for coding assistance, writing, and problem-solving — examining both the benefits and risks, from reduced cognitive load to over-reliance and academic integrity concerns. Our work informs the design of scaffolded AI tools that promote critical thinking, metacognition, and genuine understanding rather than surface-level productivity.",
  accent: "bg-well-red",
};

export default async function GenAIEducationPage() {
  const research = await getGenAIEducationResearch();
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
