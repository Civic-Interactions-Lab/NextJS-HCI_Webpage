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
import { getConferences } from "@/sanity/lib/conference/getConference";

const EventsView = async () => {
  const owlHacksImages = await getAboutEventOwlHacksImages();
  const hciOpenHouseImages = await getAboutEventOpenHouseImages();
  const socialEventImages = await getAboutEventSocialImages();
  const conferenceTravelImage = await getAboutConferenceTravelImage();
  const conferences = await getConferences();

  return (
    <div className="overflow-hidden">
      <OwlHacks images={owlHacksImages} />

      <HCIOpenHouse images={hciOpenHouseImages} />

      <SocialEvents images={socialEventImages} />

      <ConferenceTravel
        image={conferenceTravelImage}
        conferences={conferences}
      />
    </div>
  );
};
export default EventsView;
