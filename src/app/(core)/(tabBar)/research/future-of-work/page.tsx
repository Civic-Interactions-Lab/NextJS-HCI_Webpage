import { getFutureOfWorkResearch } from "@/sanity/lib/research/getResearch";
import ResearchTopicView from "@/modules/research/ui/views/research-topic-view";
import { CATEGORIES } from "@/modules/research/ui/research-data";

const cat = CATEGORIES.find((c) => c.href === "/research/future-of-work")!;

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
