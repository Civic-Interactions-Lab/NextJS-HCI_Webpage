import { getSocialComputingResearch } from "@/sanity/lib/research/getResearch";
import ResearchTopicView from "@/modules/research/ui/views/research-topic-view";
import { CATEGORIES } from "@/modules/research/ui/research-data";

const cat = CATEGORIES.find((c) => c.href === "/research/social-computing")!;

export default async function SocialComputingPage() {
  const research = await getSocialComputingResearch();
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
