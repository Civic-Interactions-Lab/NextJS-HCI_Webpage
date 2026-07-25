"use client";

import { People } from "../../../../../sanity.types";
import ViewIntroHeader from "@/components/view-intro-header";
import CurrentMembers from "@/modules/people/ui/components/current-members";
import NavCardsList from "@/components/nav-cards-list";
import CtaBanner from "@/components/cta-banner";
import { PEOPLE_NAV_LINKS } from "@/modules/people/constants";

interface PeopleViewProps {
  currentMembers: People[];
}

const PeopleView = ({ currentMembers }: PeopleViewProps) => {
  const navLinks = PEOPLE_NAV_LINKS.filter((link) => link.href !== "/people");

  return (
    <div className="space-y-20">
      <ViewIntroHeader
        label="Temple HCI Lab"
        titlePrefix="Meet our current"
        titleAccent="lab members."
        body="PhD candidates, master's students, undergraduate researchers, and participants in the Research Scholars Program — who bring creativity, curiosity, and collaboration to every project. Together, we explore ideas, share knowledge, and support one another's growth as we advance our lab's research and impact."
        imageSrc="/images/cover/3-studio.jpg"
        imageAlt="Students working together in the Temple HCI Lab studio"
      />

      <CurrentMembers currentMembers={currentMembers} />

      <NavCardsList
        ariaLabel="Other Temple HCI Lab people pages"
        items={navLinks}
        cta={(item) => `View ${item.label}`}
      />

      <CtaBanner
        label="Join the Lab"
        title="Interested in becoming a member?"
        body="We're always looking for curious, driven students to join our research community. PhD, masters, undergrad — all welcome."
        ctaLabel="Apply Now"
        ctaHref="/join"
      />
    </div>
  );
};

export default PeopleView;
