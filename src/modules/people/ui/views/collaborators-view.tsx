import { People } from "../../../../../sanity.types";
import ViewIntroHeader from "@/components/view-intro-header";
import CollaboratorsGrid from "@/modules/people/ui/components/collaborators-grid";
import NavCardsList from "@/components/nav-cards-list";
import { PEOPLE_NAV_LINKS } from "@/modules/people/constants/people-nav-links";

const CollaboratorsView = ({ collaborators }: { collaborators: People[] }) => {
  const navLinks = PEOPLE_NAV_LINKS.filter((link) => link.href !== "/people/collaborators");

  return (
    <div className="space-y-16">
      <ViewIntroHeader
        label="Temple HCI Lab"
        titlePrefix="Meet our"
        titleAccent="collaborators."
        body="Our work doesn't happen in isolation. These partners — across departments, institutions, and industry — bring new perspectives, resources, and expertise that push our research further than we could go alone."
        imageSrc="/images/cover/conference.jpg"
        imageAlt="Temple HCI Lab members collaborating with partners"
      />

      <CollaboratorsGrid collaborators={collaborators} />

      <NavCardsList
        ariaLabel="Other Temple HCI Lab people pages"
        items={navLinks}
        ctaVariant="view"
      />
    </div>
  );
};

export default CollaboratorsView;
