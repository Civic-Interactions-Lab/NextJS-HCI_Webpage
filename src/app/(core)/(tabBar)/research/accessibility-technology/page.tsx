import { getAccessibilityTechnologyResearch } from "@/sanity/lib/research/getResearch";
import ResearchTopicView from "@/modules/research/ui/views/research-topic-view";

const cat = {
  label: "Accessibility Technology",
  tagline:
    "Accessibility technology empowers everyone to connect, create, and participate — no barriers, just possibilities.",
  description:
    "Our Accessibility Technology research focuses on building and studying tools that remove barriers for people with disabilities — particularly in communication, education, and everyday digital life. We design and evaluate augmentative and alternative communication (AAC) systems, screen reader interfaces, and adaptive input methods. Our work is grounded in participatory design with disabled communities, ensuring that the people who use these tools shape how they are built. We publish at ASSETS and CHI, and collaborate with clinicians, educators, and disability advocates.",
  accent: "bg-sky",
};

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
