import { SectionHeading } from "@/components/AppTitle";
import { LinkButton } from "@/components/AppButton";
import Image from "next/image";
import TapeTag from "@/components/TapeTag";
import { getImageSrc } from "@/lib/utils";
import { AboutEventOpenHouseQueryResult } from "../../../../../sanity.types";

interface HciOpenHouseProps {
  images?: AboutEventOpenHouseQueryResult;
}

const HciOpenHouse = ({ images }: HciOpenHouseProps) => {
  const firstImage = images?.[0];
  const secondImage = images?.[1];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center pt-0 md:pt-6">
      <div className="flex flex-col gap-6 order-1 md:order-2 md:row-start-1">
        <SectionHeading title="HCI OPEN HOUSE" />
        <p className="body-text">
          At HCI Lab Open House, students and researchers from across Temple
          showcase their latest projects in Human-Computer Interaction. This
          event highlights ongoing work from our undergraduate researchers,
          master&apos;s students, PhD candidates, and Research Scholars Program
          participants. Explore interactive demos, learn about emerging ideas
          shaping the future of technology, and experience firsthand why our lab
          is becoming a growing hub for innovation at Temple.
        </p>
      </div>

      <div className="relative order-2 md:order-1 md:row-start-1 mr-8">
        <div className="h-56 md:h-64 overflow-hidden">
          <Image
            src={getImageSrc(firstImage?.asset)}
            alt={firstImage?.alt || "HCI Open House Event"}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute top-12 -right-8 rotate-12 bg-pink-300 text-primary-red-900 px-4 py-2 rounded-full font-bold text-sm md:text-base font-jetbrains-mono">
          #community
        </div>
      </div>

      <div className="relative order-3 md:order-3 md:row-start-2 mr-8">
        <div className="h-56 md:h-64 overflow-hidden">
          <Image
            src={getImageSrc(secondImage?.asset)}
            alt={secondImage?.alt || "Icebreaker at HCI Open House"}
            fill
            className="object-cover"
          />
          <TapeTag>
            <p className="text-xs md:text-sm font-light font-jetbrains-mono leading-tight wrap-break-word whitespace-normal max-w-40 md:max-w-48 line-clamp-3">
              {secondImage?.alt || "Icebreaker at HCI Open House"}
            </p>
          </TapeTag>
        </div>
      </div>

      <div className="flex flex-col space-y-3 order-4 md:order-4 md:row-start-2">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 font-outfit mt-3">
          We want you... exactly as you are!
        </h3>
        <p className="body-text">
          We want students to get to know the team and connect with current
          members. Students from psychology, computer science, design, and
          related fields are all welcome—anyone curious about Human-Computer
          Interaction can join, learn, and get involved.
        </p>
        <div className="flex mt-3">
          <LinkButton
            href="/join"
            ariaLabel="Join the HCI Lab"
            text="JOIN THE LAB"
          />
        </div>
      </div>
    </div>
  );
};

export default HciOpenHouse;
