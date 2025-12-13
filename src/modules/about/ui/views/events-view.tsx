import React from "react";
import OwlHacks from "@/modules/about/ui/components/OwlHacks";
import HCIOpenHouse from "@/modules/about/ui/components/HCIOpenHouse";
import SocialEvents from "@/modules/about/ui/components/SocialEvents";
import ConferenceTravel from "@/modules/about/ui/components/ConferenceTravel";
import { getAboutEventOwlHacksImages } from "@/sanity/lib/imageSettings/aboutImages";

const EventsView = async () => {
  const owlHacksImages = await getAboutEventOwlHacksImages();

  return (
    <>
      <OwlHacks images={owlHacksImages} />

      <HCIOpenHouse />

      <SocialEvents />

      <ConferenceTravel />
    </>
  );
};
export default EventsView;
