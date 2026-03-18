import React from "react";
import FindUs from "@/modules/about/ui/components/FindUs";
import GetInTouch from "@/modules/about/ui/components/GetInTouch";
import LocationMap from "@/components/LocationMap";
import { getAboutSercImage } from "@/sanity/lib/imageSettings/aboutImages";

const ContactUsView = async () => {
  const sercImage = await getAboutSercImage();

  return (
    <div className="space-y-16">
      <FindUs image={sercImage} />

      <GetInTouch />

      <LocationMap
        title="Human-Computer Interaction (HCI) Lab"
        placeName="Science Education and Research Center (SERC)"
        address="1925 N 12th St, Philadelphia, PA 19122"
        className="pt-6"
      />
    </div>
  );
};
export default ContactUsView;
