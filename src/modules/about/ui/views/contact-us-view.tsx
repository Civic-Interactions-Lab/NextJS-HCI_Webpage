import FindUs from "@/modules/about/ui/components/find-us";
import GetInTouch from "@/modules/about/ui/components/get-in-touch";
import { SectionTitle } from "@/components/section-title";
import ContactLocationMap from "@/modules/about/ui/components/contact-location-map";

export default async function ContactUsView() {
  return (
    <div className="space-y-32">
      <FindUs />
      <GetInTouch />
      <section className="flex flex-col gap-8">
        <SectionTitle>Our Location</SectionTitle>
        <ContactLocationMap />
      </section>
    </div>
  );
}
