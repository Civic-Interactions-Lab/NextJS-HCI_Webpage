import JoinView from "@/modules/join/ui/views/join-view";
import { getFAQs } from "@/sanity/lib/faq/getFAQs";

export default async function JoinPage() {
  const faqs = await getFAQs();
  return <JoinView faqs={faqs} />;
}
