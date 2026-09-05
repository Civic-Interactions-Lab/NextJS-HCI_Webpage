import { getAccessibilityTechnologyResearch } from "@/sanity/lib/research/getResearch";
import ResearchTopicView from "@/modules/research/ui/views/research-topic-view";

export default async function AccessibilityTechnologyPage() {
  const research = await getAccessibilityTechnologyResearch();
  return (
    <ResearchTopicView label="Accessibility Technology" research={research} />
  );
}
