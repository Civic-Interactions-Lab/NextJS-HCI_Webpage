import ViewIntroHeader from "@/components/view-intro-header";
import EventsUpcoming from "@/modules/about/ui/components/events-upcoming";
import EventsGallery from "@/modules/about/ui/components/events-gallery";
import {
  getUpcomingEvents,
  getPastEvents,
} from "@/sanity/lib/events/getEvents";

export default async function EventsView() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);

  return (
    <div className="space-y-32">
      <ViewIntroHeader
        label="What we do together"
        titlePrefix="Hackathons. Open Houses."
        titleAccent="Showcases."
        body="Events at the Temple HCI Lab are where community happens — from overnight hackathons and open houses to conference travel and end-of-semester showcases. There's always something going on."
        imageSrc="/images/cover/open-house-3.jpg"
        imageAlt="Students at a Temple HCI Lab event"
      />
      {upcomingEvents.length === 0 && pastEvents.length === 0 ? (
        <p className="text-p1 text-thunder/50 py-12">No events yet.</p>
      ) : (
        <>
          <EventsUpcoming events={upcomingEvents} />
          <EventsGallery events={pastEvents} />
        </>
      )}
    </div>
  );
}
