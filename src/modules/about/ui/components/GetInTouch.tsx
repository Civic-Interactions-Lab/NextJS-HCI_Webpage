import React from "react";
import { SectionHeading } from "@/components/AppTitle";
import { LinkButton } from "@/components/AppButton";
import Image from "next/image";
import Link from "next/link";

const GetInTouch = () => {
  return (
    <div className="flex flex-col space-y-6 md:space-y-12">
      <SectionHeading title="Get In Touch With Us!" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start mr-0 md:mr-12">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="flex justify-center size-24 md:size-32">
            <Image
              src="/icons/handshake.png"
              alt="sponsor us"
              width={120}
              height={120}
            />
          </div>

          <div className="flex">
            <LinkButton
              href="/sponsor"
              ariaLabel="Learn about sponsoring the HCI Lab"
              text="Be a Supporter"
            />
          </div>

          <div className="space-y-2 mt-6">
            <h3 className="text-xl md:text-2xl lg:text-2xl font-semibold text-gray-900 font-outfit">
              HCI Lab Email Address
            </h3>
            <Link href="mailto:hcilab@temple.edu">
              <p className="text-sm md:text-base lg:text-lg text-gray-700 underline hover:text-gray-400 transition-colors inline-block">
                hcilab@temple.edu
              </p>
            </Link>
          </div>
        </div>

        {/* Join The Lab Section */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="flex justify-center size-24 md:size-32">
            <Image
              src="/icons/people.png"
              alt="sponsor us"
              width={120}
              height={120}
            />
          </div>

          <div className="flex">
            <LinkButton
              href="/join"
              ariaLabel="Learn about joining the HCI Lab"
              text="JOIN THE LAB"
            />
          </div>

          <div className="space-y-3 mt-6">
            <h3 className="text-xl md:text-2xl lg:text-2xl font-semibold text-gray-900 font-outfit">
              Are you an undergraduate interested in HCI?
            </h3>
            <Link href="/join">
              <p className="text-sm md:text-base lg:text-lg text-gray-700 underline hover:text-gray-400 transition-colors inline-block">
                Check out some commonly asked questions
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
