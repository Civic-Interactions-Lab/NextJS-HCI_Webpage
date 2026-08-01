"use client";

import ViewIntroHeader from "@/components/view-intro-header";
import EventsUpcoming from "@/modules/about/ui/components/events-upcoming";
import EventsGallery from "@/modules/about/ui/components/events-gallery";

export default function EventsView() {
  return (
    <div className="space-y-32">
      <ViewIntroHeader
        label="What we do together"
        titlePrefix="Hackathons. Open Houses."
        titleAccent="Showcases."
        body="Events at the Temple HCI Lab are where community happens — from overnight hackathons and open houses to conference travel and end-of-semester showcases. There's always something going on."
        imageSrc="/images/cover/HCI_OpenHouse-38.jpg"
        imageAlt="Students at a Temple HCI Lab event"
      />
      <EventsUpcoming />
      <EventsGallery />
    </div>
  );
}
