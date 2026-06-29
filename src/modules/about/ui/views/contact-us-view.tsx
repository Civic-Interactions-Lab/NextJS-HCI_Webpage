import React from "react";
import FindUs from "@/modules/about/ui/components/FindUs";
import GetInTouch from "@/modules/about/ui/components/GetInTouch";
import { SectionTitle } from "@/components/section-title";
import ContactLocationMap from "@/modules/about/ui/components/contact-location-map";

const ContactUsView = async () => {
  return (
    <div className="space-y-20">
      <FindUs />
      <GetInTouch />
      <section className="flex flex-col gap-8">
        <SectionTitle>Our Location</SectionTitle>
        <ContactLocationMap />
      </section>
    </div>
  );
};

export default ContactUsView;
