import React from "react";
import { SectionHeading } from "@/components/AppTitle";
import Image from "next/image";
import { AboutEventSocialQueryResult } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";
import { LinkButton } from "@/components/AppButton";

interface SocialEventsProps {
  images?: AboutEventSocialQueryResult;
}

const SocialEvents = ({ images }: SocialEventsProps) => {
  const firstImage = images?.[0];
  const secondImage = images?.[1];

  return (
    <div className="flex flex-col space-y-4 md:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="flex flex-col gap-6 order-1 md:order-1 md:row-start-1">
          <SectionHeading title="SOCIAL EVENTS" />
          <p className="body-text">
            Events play an important role in creating a welcoming and connected
            community within the HCI Lab. We intentionally design gatherings—
            workshops, socials, icebreakers, and open houses—to help students
            meet one another, build trust, and feel supported. These moments
            give new and returning members space to form relationships, share
            experiences, and feel at home in the lab, strengthening the
            collaborative culture we value.
          </p>
        </div>

        <div className="relative order-2 md:order-2 md:row-start-1 mr-0 ml-8 md:ml-0 md:mr-8">
          <div className="h-56 md:h-64">
            <Image
              src={getImageSrc(firstImage?.asset)}
              alt={firstImage?.alt || "HCI Social Event"}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="relative order-3 md:order-4 md:row-start-2 mr-0 ml-8 md:ml-0 md:mr-8">
          <div className="relative h-56 md:h-64 w-full">
            <Image
              src={getImageSrc(secondImage?.asset)}
              alt={secondImage?.alt || "HCI Social Event"}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute bottom-16 -left-8 -rotate-12 bg-sky text-white px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-lg">
            #TEAM
          </div>
        </div>

        <div className="flex flex-col space-y-3 order-4 md:order-3 md:row-start-2">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 font-outfit">
            &quot;Let&apos;s play ball!&quot;
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
            Our social events are organized by members of the lab and offer a
            relaxed way to take a break, meet new people, and strengthen our
            community. Whether it&apos;s games, food, or quick hangouts, these
            moments help us connect beyond research and get to know each other
            better.
          </p>

          <div className="flex mt-3">
            <LinkButton
              href="/join"
              ariaLabel="Join the HCI Lab"
              text="Follow Along"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialEvents;
