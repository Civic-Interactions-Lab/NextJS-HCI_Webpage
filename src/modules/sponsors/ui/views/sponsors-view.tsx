import { SponsorsQueryResult } from "../../../../../sanity.types";
import NavCardsList from "@/components/nav-cards-list";
import ViewIntroHeader from "@/components/view-intro-header";
import SponsorsGrid from "@/modules/sponsors/ui/components/sponsors-grid";
import { SPONSOR_NAV_ITEMS } from "@/modules/sponsors/constants/sponsor-nav-items";

interface SponsorsViewProps {
  sponsors: SponsorsQueryResult;
}

export default function SponsorsView({ sponsors }: SponsorsViewProps) {
  return (
    <div className="space-y-32">
      <ViewIntroHeader
        label="Our Sponsors"
        titlePrefix="The organizations that make our"
        titleAccent="work possible."
        body="Thank you to our sponsors for your generous support. Your contributions help the HCI Lab continue to grow, innovate, and empower students to make a real impact through research and design."
        imageSrc="/images/cover/news-3.jpg"
        imageAlt="Professor Steve Macneil giving a speech"
      />

      <SponsorsGrid sponsors={sponsors} />

      <NavCardsList
        ariaLabel="Sponsorship opportunities"
        items={SPONSOR_NAV_ITEMS}
      />
    </div>
  );
}
