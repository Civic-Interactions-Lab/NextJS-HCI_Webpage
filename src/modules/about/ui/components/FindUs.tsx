import React from "react";
import { SectionHeading } from "@/components/AppTitle";
import { LinkButton } from "@/components/AppButton";
import Image from "next/image";
import TapeTag from "@/components/TapeTag";
import { AboutSercQueryResult } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";
import Link from "next/link";

interface FindUsProps {
  image: AboutSercQueryResult;
}

const FindUs = ({ image }: FindUsProps) => {
  return (
    <div className="flex flex-col space-y-6 md:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12 items-start mb-6 md:mb-8">
        <div className="relative order-2 md:order-1 mx-0 md:mx-8">
          <div className="h-64 md:h-96">
            <Image
              src={getImageSrc(image?.asset)}
              alt={image?.alt || "Temple HCI Lab - SERC Building"}
              fill
              className="object-cover"
              priority
            />
            <TapeTag position="top-left" color="white">
              <p className="text-xs md:text-sm font-light font-jetbrains-mono leading-tight wrap-break-word whitespace-normal max-w-56 line-clamp-3">
                Front doors of the Science Research Education Center (SERC)
              </p>
            </TapeTag>
          </div>
        </div>

        <div className="flex flex-col gap-3 order-1 md:order-2">
          <SectionHeading title="Find Us At SERC" />
          <div className="flex">
            <Link
              href="https://maps.app.goo.gl/LtyYfGsqPRWU51me7"
              rel="noopener noreferrer"
              target="_blank"
            >
              <p className="text-blue-600 underline hover:text-blue-800">
                Direction and Parking
              </p>
            </Link>
          </div>

          <p className="body-text">
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
            <div className="body-text">
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
