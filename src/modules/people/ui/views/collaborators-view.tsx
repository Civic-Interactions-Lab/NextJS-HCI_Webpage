"use client";

import { People } from "../../../../../sanity.types";
import CollaboratorsGrid from "@/modules/people/ui/components/collaborators-grid";
import NavCardsList from "@/components/nav-cards-list";
import { PEOPLE_NAV_LINKS } from "@/modules/people/constants";

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
