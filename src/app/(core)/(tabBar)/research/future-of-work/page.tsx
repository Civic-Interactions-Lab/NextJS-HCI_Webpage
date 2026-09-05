import { getFutureOfWorkResearch } from "@/sanity/lib/research/getResearch";
import ResearchTopicView from "@/modules/research/ui/views/research-topic-view";

export default async function FutureOfWorkPage() {
  const research = await getFutureOfWorkResearch();
  return <ResearchTopicView label="Future of Work" research={research} />;
}
