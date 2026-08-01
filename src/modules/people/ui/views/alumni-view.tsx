"use client";

import { People } from "../../../../../sanity.types";
import ViewIntroHeader from "@/components/view-intro-header";
import AlumniGrid from "@/modules/people/ui/components/alumni-grid";
import FuelNextGeneration from "@/modules/people/ui/components/fuel-next-generation";
import FoundingPatrons from "@/modules/people/ui/components/founding-patrons";
import NavCardsList from "@/components/nav-cards-list";

const PEOPLE_NAV_LINKS = [
  {
    label: "Current Members",
    href: "/people",
    tagline:
      "PhD candidates, master's students, undergraduate researchers, and Research Scholars — the people driving our work.",
  },
  {
    label: "Alumni",
    href: "/people/alumni",
    tagline:
      "Former lab members who have gone on to careers in industry, academia, and beyond.",
  },
  {
    label: "Collaborators",
    href: "/people/collaborators",
    tagline:
      "Researchers and practitioners from other institutions who work alongside our lab.",
  },
];

const AlumniView = ({ alumni }: { alumni: People[] }) => {
  const navLinks = PEOPLE_NAV_LINKS.filter(
    (link) => link.href !== "/people/alumni",
  );

  return (
    <div className="space-y-20">
      <ViewIntroHeader
        label="Temple HCI Lab"
        titlePrefix="Meet our"
        titleAccent="alumni network."
        body="They pulled the all-nighters, soldered the prototypes, and presented the posters. Now they're out in the world — and many of them are helping the next generation do the same."
        imageSrc="/images/cover/group-2.jpg"
        imageAlt="Temple HCI Lab alumni and students together"
      />

      <FuelNextGeneration />

      <FoundingPatrons />

      <AlumniGrid alumni={alumni} />

      <NavCardsList
        ariaLabel="Other Temple HCI Lab people pages"
        items={navLinks}
        cta={(item) => `View ${item.label}`}
      />
    </div>
  );
};

export default AlumniView;
