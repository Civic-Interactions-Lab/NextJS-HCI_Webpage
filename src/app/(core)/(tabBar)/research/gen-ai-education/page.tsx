import { getGenAIEducationResearch } from "@/sanity/lib/research/getResearch";
import ResearchTopicView from "@/modules/research/ui/views/research-topic-view";

export default async function GenAIEducationPage() {
  const research = await getGenAIEducationResearch();
  return <ResearchTopicView label="Gen AI & Education" research={research} />;
}
