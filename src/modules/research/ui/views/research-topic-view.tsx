import { Research } from "../../../../../sanity.types";
import ResearchHero, {
  ResearchTopicLabel,
} from "@/modules/research/ui/components/research-hero";
import NavCardsList from "@/components/nav-cards-list";
import CtaBanner from "@/components/cta-banner";
import ResearchGrid from "@/modules/research/ui/components/research-grid";
import FeaturedVideo from "@/modules/research/ui/components/featured-video";
import { RESEARCH_CATEGORIES } from "@/modules/research/constants/research-categories";

interface ResearchTopicViewProps {
  label: ResearchTopicLabel;
  research: Research[];
}

export default function ResearchTopicView({
  label,
  research,
}: ResearchTopicViewProps) {
  const otherCategories = RESEARCH_CATEGORIES.filter((c) => c.label !== label);

  return (
    <div className="space-y-32">
      <ResearchHero variant={label} />

      <ResearchGrid label={label} research={research} />

      <FeaturedVideo variant={label} />

      <NavCardsList
        ariaLabel="Other Temple HCI Lab research topics"
        items={otherCategories}
        linkDescriptionVariant="research"
      />

      <CtaBanner
        label="Get Involved"
        title="Interested in joining our research?"
        body="The Temple HCI Lab welcomes undergraduate and graduate students who are passionate about human-centered design, AI, accessibility, and social computing. Apply to join and help shape the future of HCI research."
        ctaLabel="Apply to join"
        ctaHref="/join"
      />
    </div>
  );
}
