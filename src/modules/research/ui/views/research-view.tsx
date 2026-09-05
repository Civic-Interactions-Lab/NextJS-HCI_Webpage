import ResearchHero from "@/modules/research/ui/components/research-hero";
import NavCardsList from "@/components/nav-cards-list";
import CtaBanner from "@/components/cta-banner";
import FeaturedVideo from "@/modules/research/ui/components/featured-video";
import { RESEARCH_CATEGORIES } from "@/modules/research/constants/research-categories";

export default function ResearchView() {
  return (
    <div className="space-y-32">
      <ResearchHero variant="overview" />

      <FeaturedVideo variant="overview" />

      <NavCardsList
        ariaLabel="Temple HCI Lab research topics"
        items={RESEARCH_CATEGORIES}
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
