import { getAccessibilityTechnologyResearch } from "@/sanity/lib/research/getResearch";
import ResearchTopicView from "@/modules/research/ui/views/research-topic-view";
import { CATEGORIES } from "@/modules/research/constants";

const cat = CATEGORIES.find((c) => c.href === "/research/accessibility-technology")!;

export default async function AccessibilityTechnologyPage() {
  const research = await getAccessibilityTechnologyResearch();
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
