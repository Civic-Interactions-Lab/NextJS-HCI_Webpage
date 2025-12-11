import React from "react";
import OwlHacks from "@/modules/about/ui/components/OwlHacks";
import HCIOpenHouse from "@/modules/about/ui/components/HCIOpenHouse";
import SocialEvents from "@/modules/about/ui/components/SocialEvents";
import ConferenceTravel from "@/modules/about/ui/components/ConferenceTravel";

const EventsView = () => {
  return (
    <>
      <OwlHacks />

      <HCIOpenHouse />

      <SocialEvents />

      <ConferenceTravel />
    </>
  );
};
export default EventsView;
