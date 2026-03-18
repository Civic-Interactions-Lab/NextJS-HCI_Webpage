import { SectionHeading } from "@/components/AppTitle";

const CommunityResearch = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      <div className="flex flex-col col-span-2 gap-6 justify-start items-start text-start">
        <SectionHeading title="COMMUNITY RESEARCH" />
        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          Our lab takes a community-centered approach where students
          collaborate, share ideas, and learn from each other. Together, they
          explore real-world questions, build research skills, and create
          meaningful, collective solutions.
        </p>

        <div className="space-y-2">
          <p className="text-2xl md:text-4xl font-bold text-gray-900">
            77{" "}
            <span className="body-text">
              undergraduate students have been an author on peer-reviewed work.
            </span>
          </p>

          <p className="text-2xl md:text-4xl font-bold text-gray-900">
            ~45{" "}
            <span className="body-text">
              active researchers working collaboratively on challenging projects
            </span>
          </p>
        </div>
      </div>

      <div className="relative px-0 md:px-8 pr-6">
        <div className="relative mx-auto aspect-9/16 max-h-100">
          <video
            src="/videos/hci.mov"
            className="w-full h-full object-cover border border-gray-400"
            controls
            playsInline
            preload="metadata"
          />

          <div className="absolute rotate-16 top-12 -right-12 px-2 md:px-4 py-1 bg-primary-red-900 rounded-full">
            <p className="text-sm lg:text-lg text-white font-semibold uppercase">
              #ourstudio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityResearch;
