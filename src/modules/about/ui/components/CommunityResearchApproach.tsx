import { BorderHeading } from "@/components/AppTitle";

const CommunityResearchApproach = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <div className="flex flex-col gap-6 justify-start items-start text-start">
        <BorderHeading title="Community Research Approach" />
        <p className="text-sm md:text-lg xl:text-xl text-gray-700 leading-relaxed">
          Our lab takes a community-centered approach where students
          collaborate, share ideas, and learn from each other. Together, they
          explore real-world questions, build research skills, and create
          meaningful, collective solutions.
        </p>
      </div>

      {/* Video container */}
      <div className="relative px-0 md:px-8 pr-6">
        <iframe
          src="https://www.youtube.com/embed/CkwdRPN-r2M?si=R5YQhcKB3TjxnZtr"
          title="Community Research Video"
          className="w-full h-56 md:h-72  rounded-xl overflow-hidden  border border-gray-400"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />

        {/* Studio Tag */}
        <div className="absolute -rotate-16 bottom-16 -right-6 px-3 md:px-6 py-1 md:py-2 bg-primary-red-900 rounded-full">
          <p className="text-sm md:text-lg text-white font-semibold uppercase">
            #ourstudio
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityResearchApproach;
