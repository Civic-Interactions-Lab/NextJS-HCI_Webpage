import React from "react";
import { BorderHeading } from "@/components/AppTitle";
import { LinkButton } from "@/components/AppButton";
import Image from "next/image";
import TapeTag from "@/components/TapeTag";

const FindUs = () => {
  return (
    <div className="flex flex-col space-y-6 md:space-y-12">
      <BorderHeading title="Find Us At SERC" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12 items-start mb-6 md:mb-8">
        <div className="relative order-2 md:order-1 mx-0 md:mx-8">
          <div className="h-64 md:h-96">
            <Image
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="Science Education and Research Center (SERC) building at Temple University"
              fill
              className="object-cover"
              priority
            />
            <TapeTag position="top-left" color="white">
              <p className="text-xs md:text-sm font-light font-jetbrains-mono leading-tight break-words whitespace-normal max-w-40 md:max-w-48 line-clamp-3">
                Front doors of the Science Research Education Center (SERC)
              </p>
            </TapeTag>
          </div>
        </div>

        <div className="flex flex-col gap-6 order-1 md:order-2">
          <div className="flex">
            <LinkButton
              href="/directions"
              ariaLabel="Get directions and parking information for SERC"
              text="DIRECTIONS AND PARKING"
            />
          </div>

          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
            The Human-Computer Interaction (HCI) Lab meets in the College of
            Science and Technology at Temple University, located in the Science
            Education and Research Center (SERC) building. This vibrant space
            brings together students and researchers to explore the intersection
            of technology, design, and human experience.
          </p>

          <div className="mt-0 md:mt-3 text-end md:text-start">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 font-outfit mb-2">
              HCI Mailing Address
            </h3>
            <div className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
              <p className="font-medium">Temple University HCI Lab</p>
              <p>1925 N 12th St (SERC 301)</p>
              <p>Philadelphia, PA 19122</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindUs;
