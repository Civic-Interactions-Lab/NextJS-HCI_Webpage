"use client";

import EventsIntro from "@/modules/about/ui/components/events-intro";
import EventsUpcoming from "@/modules/about/ui/components/events-upcoming";
import EventsGallery from "@/modules/about/ui/components/events-gallery";

const EventsView = () => {
  return (
    <div className="space-y-20">
      <EventsIntro />
      <EventsUpcoming />
      <EventsGallery />
    </div>
  );
};

export default EventsView;
