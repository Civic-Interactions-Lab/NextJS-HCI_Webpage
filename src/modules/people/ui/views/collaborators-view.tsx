"use client";

import { People } from "../../../../../sanity.types";
import CollaboratorsGrid from "@/modules/people/ui/components/collaborators-grid";
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

const CollaboratorsView = ({ collaborators }: { collaborators: People[] }) => {
  const navLinks = PEOPLE_NAV_LINKS.filter((link) => link.href !== "/people/collaborators");

  return (
    <div className="space-y-16">
      <CollaboratorsGrid collaborators={collaborators} />

      <NavCardsList
        ariaLabel="Other Temple HCI Lab people pages"
        items={navLinks}
        cta={(item) => `View ${item.label}`}
      />
    </div>
  );
};

export default CollaboratorsView;
