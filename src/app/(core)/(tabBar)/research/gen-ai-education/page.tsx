import { getGenAIEducationResearch } from "@/sanity/lib/research/getResearch";
import ResearchTopicView from "@/modules/research/ui/views/research-topic-view";
import { CATEGORIES } from "@/modules/research/constants";

const cat = CATEGORIES.find((c) => c.href === "/research/gen-ai-education")!;

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
