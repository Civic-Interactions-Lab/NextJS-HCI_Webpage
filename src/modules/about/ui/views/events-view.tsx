import React from "react";
import OwlHacks from "@/modules/about/ui/components/OwlHacks";
import HCIOpenHouse from "@/modules/about/ui/components/HCIOpenHouse";
import SocialEvents from "@/modules/about/ui/components/SocialEvents";
import ConferenceTravel from "@/modules/about/ui/components/ConferenceTravel";
import {
  getAboutConferenceTravelImage,
  getAboutEventOpenHouseImages,
  getAboutEventOwlHacksImages,
  getAboutEventSocialImages,
} from "@/sanity/lib/imageSettings/aboutImages";

const EventsView = async () => {
  const owlHacksImages = await getAboutEventOwlHacksImages();
  const hciOpenHouseImages = await getAboutEventOpenHouseImages();
  const socialEventImages = await getAboutEventSocialImages();
  const conferenceTravelImage = await getAboutConferenceTravelImage();

  return (
    <>
      <OwlHacks images={owlHacksImages} />

      <HCIOpenHouse images={hciOpenHouseImages} />

      <SocialEvents images={socialEventImages} />

      <ConferenceTravel image={conferenceTravelImage} />
    </>
  );
};
export default EventsView;
