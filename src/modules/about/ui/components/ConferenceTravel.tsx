import React from "react";
import { SectionHeading } from "@/components/AppTitle";
import { LinkButton } from "@/components/AppButton";
import Image from "next/image";
import TapeTag from "@/components/TapeTag";
import WorldMap from "@/modules/about/ui/components/WorldMap";
import {
  AboutConferenceTravelQueryResult,
  ConferencesQueryResult,
} from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";

interface ConferenceTravelProps {
  image?: AboutConferenceTravelQueryResult;
  conferences: ConferencesQueryResult;
}

const ConferenceTravel = ({ image, conferences }: ConferenceTravelProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center pt-0 md:pt-8">
      <div className="flex flex-col gap-6 order-1 md:order-2 md:row-start-1">
        <SectionHeading title="Conference Travel" />
        <p className="body-text">
          Human-Computer Interaction is grounded in understanding people,
          cultures, and the many ways we interact with technology. As our
          members travel for conferences and collaborations, they experience
          diverse perspectives that deepen their research and broaden their
          connection to the global HCI community. These opportunities reinforce
          that HCI is not just about designing technology—it&apos;s about
          engaging with the world.
        </p>
      </div>

      {/* Image - mobile: 2nd, desktop: left col row 1 */}
      <div className="relative order-2 md:order-1 md:row-start-1 mr-8">
        <div className="h-56 md:h-64 overflow-hidden">
          <Image
            src={getImageSrc(image?.asset)}
            alt={image?.alt || "HCI Conference Travel"}
            fill
            className="object-cover"
            priority
          />
          <TapeTag position="top-right" color="black" rotation={24}>
            <p className="text-xs font-light font-jetbrains-mono leading-tight wrap-break-word whitespace-normal max-w-60 line-clamp-3">
              {image?.alt || "HCI Conference Travel"}
            </p>
          </TapeTag>
        </div>
      </div>

      {/* World Map - mobile: 3rd, desktop: left col row 2 */}
      <div className="order-3 md:order-3 md:row-start-2 mr-8">
        <WorldMap conferences={conferences} />
      </div>

      <div className="flex flex-col space-y-3 order-4 md:order-4 md:row-start-2">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 font-outfit mt-3">
          Where We&apos;re Going
        </h3>
        <p className="body-text">
          Research in the HCI Lab opens doors for students to travel, present
          their work, and connect with the wider academic community. Through
          conferences, workshops, and collaborations, our members gain the
          chance to explore new places, share their ideas, and build meaningful
          professional networks that shape their future careers.
        </p>
        <div className="flex mt-3">
          <LinkButton
            href="/research"
            ariaLabel="Learn more about conference travel opportunities"
            text="LEARN MORE"
          />
        </div>
      </div>
    </div>
  );
};

export default ConferenceTravel;
