import { BorderHeading } from "@/components/AppTitle";
import TapeTag from "@/components/TapeTag";
import { LinkButton } from "@/components/AppButton";
import Image from "next/image";

const StudioTime = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
      <div className="relative p-4 md:p-6 order-2 md:order-1">
        <div className="-rotate-6">
          <Image
            src="/images/cover/3-studio.jpg"
            alt="HCI Lab members collaborating at Studio Time"
            width={500}
            height={300}
            className="w-full h-64 md:h-80 object-cover p-0 md:p-8"
          />

          <TapeTag position="top-left" rotation={-16} color="black">
            <p className="text-xs md:text-sm font-light font-jetbrains-mono leading-tight break-words whitespace-normal max-w-48 line-clamp-3 px-3">
              HCI Lab members collaborating at Studio Time
            </p>
          </TapeTag>
        </div>
      </div>

      <div className="flex flex-col gap-6 order-1 md:order-2 pl-0 md:pl-6">
        <BorderHeading title="When You're at Studio Time.." />
        <p className="text-sm md:text-lg xl:text-xl text-gray-700 leading-relaxed">
          Our HCI studio time is a collaborative space where students bring
          ideas to life through hands-on design, prototyping, and user testing.
          It&apos;s a chance to explore interaction design, share feedback, and
          develop real-world solutions that connect technology with
          people&apos;s needs.
        </p>
        <LinkButton
          href="/join"
          text="Learn More"
          ariaLabel="Learn more about Studio Time"
        />
      </div>
    </div>
  );
};

export default StudioTime;
