import JoinView from "@/modules/join/ui/views/join-view";
import { getFAQs } from "@/sanity/lib/faq/getFAQs";

const JoinPage = async () => {
  const faqs = await getFAQs();
  return <JoinView faqs={faqs} />;
};

export default JoinPage;
