import React from "react";
import { BorderHeading } from "@/components/AppTitle";
import { LinkButton } from "@/components/AppButton";
import Image from "next/image";
import TapeTag from "@/components/TapeTag";

const ConferenceTravel = () => {
  return (
    <div className="flex flex-col space-y-6 md:space-y-12 pt-0 md:pt-6">
      <BorderHeading title="Conference Travel" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12 items-center mb-6 md:mb-8">
        <div className="relative order-2 md:order-1 mx-0 md:mx-8">
          <div className="h-64 md:h-72 rounded-br-[60px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="HCI Lab members at conference"
              fill
              className="object-cover"
              priority
            />
            <TapeTag position="top-left" color="white">
              <p className="text-xs md:text-sm font-light font-jetbrains-mono leading-tight break-words whitespace-normal max-w-40 md:max-w-48 line-clamp-3">
                Lab members at place description
              </p>
            </TapeTag>
          </div>
        </div>

        <div className="flex flex-col gap-6 order-1 md:order-2">
          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
            Human-Computer Interaction is grounded in understanding people,
            cultures, and the many ways we interact with technology. As our
            members travel for conferences and collaborations, they experience
            diverse perspectives that deepen their research and broaden their
            connection to the global HCI community. These opportunities
            reinforce that HCI is not just about designing technology—it&apos;s
            about engaging with the world.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="relative order-4 md:order-1 mx-0 md:mx-8">
          <div className="relative h-64 md:h-72 rounded-tr-[150px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="World map showing conference locations"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-3 order-3 md:order-2 relative">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 font-outfit">
            Where We&apos;re Going
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
            Research in the HCI Lab opens doors for students to travel, present
            their work, and connect with the wider academic community. Through
            conferences, workshops, and collaborations, our members gain the
            chance to explore new places, share their ideas, and build
            meaningful professional networks that shape their future careers.
          </p>
          <div className="flex">
            <LinkButton
              href="/travel"
              ariaLabel="Learn more about conference travel opportunities"
              text="LEARN MORE"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceTravel;
