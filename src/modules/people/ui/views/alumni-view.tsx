"use client";

import { People } from "../../../../../sanity.types";
import ViewIntroHeader from "@/components/view-intro-header";
import AlumniGrid from "@/modules/people/ui/components/alumni-grid";
import FuelNextGeneration from "@/modules/people/ui/components/fuel-next-generation";
import FoundingPatrons from "@/modules/people/ui/components/founding-patrons";
import NavCardsList from "@/components/nav-cards-list";
import { PEOPLE_NAV_LINKS } from "@/modules/people/constants";

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
        imageSrc="/images/cover/NC_05301.jpg"
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
