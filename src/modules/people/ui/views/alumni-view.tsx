"use client";

import { People } from "../../../../../sanity.types";
import AlumniGrid from "@/modules/people/ui/components/alumni-grid";
import NavCardsList from "@/components/nav-cards-list";
import { PEOPLE_NAV_LINKS } from "@/modules/people/constants";

const AlumniView = ({ alumni }: { alumni: People[] }) => {
  const navLinks = PEOPLE_NAV_LINKS.filter((link) => link.href !== "/people/alumni");

  return (
    <div className="space-y-20">
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
