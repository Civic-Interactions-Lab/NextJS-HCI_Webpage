import React from "react";
import SponsorList from "@/modules/sponsors/ui/components/SponsorList";
import { getSponsors } from "@/sanity/lib/sponsors/getSponsors";

const SponsorsView = async () => {
  const sponsors = await getSponsors();

  return (
    <>
      <SponsorList sponsors={sponsors} />
    </>
  );
};

export default SponsorsView;
