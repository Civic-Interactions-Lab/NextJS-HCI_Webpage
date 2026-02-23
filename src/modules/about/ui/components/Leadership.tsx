import { SectionHeading } from "@/components/AppTitle";
import TapeTag from "@/components/TapeTag";
import Image from "next/image";
import { AboutLeadershipQueryResult } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";

interface LeadershipProps {
  leadershipImage: AboutLeadershipQueryResult;
}

const Leadership = ({ leadershipImage }: LeadershipProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
      <div className="flex flex-col gap-6 order-1">
        <SectionHeading title="LEADERSHIP" />

        <p className="body-text">
          Students learn to lead their own projects and make important decisions
          about the direction of their projects. Students get opportunities to
          present their work at big conferences as posters and talks.
        </p>

        <div className="space-y-2">
          <p className="text-lg md:text-xl font-bold text-gray-900">
            30+{" "}
            <span className="body-text font-normal">
              students have traveled to present their work
            </span>
          </p>

          <p className="text-lg md:text-xl font-bold text-gray-900">
            10+{" "}
            <span className="body-text font-normal">
              students have traveled internationally
            </span>
          </p>
        </div>
      </div>

      {/* Right: Image with TapeTag */}
      <div className="relative p-4 md:p-6 order-2">
        <div className="rotate-1">
          <Image
            src={getImageSrc(leadershipImage?.asset)}
            alt={leadershipImage?.alt || ""}
            width={500}
            height={300}
            className="w-full h-64 md:h-80 object-cover"
          />

          <TapeTag position="top-left" rotation={-20} color="white">
            <p className="text-xs md:text-sm font-light font-jetbrains-mono leading-tight whitespace-normal max-w-48 line-clamp-3 px-3">
              {leadershipImage?.alt}
            </p>
          </TapeTag>
        </div>
      </div>
    </div>
  );
};

export default Leadership;
