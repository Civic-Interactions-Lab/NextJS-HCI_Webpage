import { SectionHeading } from "@/components/AppTitle";
import { LinkButton } from "@/components/AppButton";

const RESEARCH_AREAS = [
  {
    id: "assistive-tech",
    title: "Assistive Tech",
    description:
      "AAC tools to foster self direction and expressive communication.",
  },
  {
    id: "computing-education",
    title: "Computing Education",
    description:
      "We study the harms of AI and develop scaffolding to promote responsible use.",
  },
  {
    id: "future-of-work",
    title: "Future of Work",
    description:
      "We develop tools to build better workplaces, and to reimagine work.",
  },
] as const;

const QuickIntroduction = () => {
  return (
    <div className="w-full">
      <div>
        <div>
          <SectionHeading
            title="Human Computer Interaction at Temple University"
            className="mb-3 md:mb-6"
          />
        </div>

        <div className="mb-8 md:mb-12">
          <p className="text-base md:text-lg xl:text-xl text-gray-800 mb-4 font-outfit">
            The Temple HCI Lab is the largest undergraduate research lab at
            Temple University. Housed in the{" "}
            <span className="font-bold underline underline-offset-2">
              College of Science and Technology
            </span>{" "}
            within the Department of Computer and Information Sciences. The lab
            is directed by{" "}
            <span className="font-bold underline underline-offset-2">
              Dr. Stephen MacNeil.
            </span>
          </p>
        </div>

        <div>
          <SectionHeading title="RESEARCH AREAS" className="mb-4 md:mb-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {RESEARCH_AREAS.map((area) => (
            <div
              key={area.id}
              className="bg-well-red text-white p-4 md:p-5 flex flex-col"
            >
              <h3 className="text-lg md:text-xl font-extrabold mb-3 md:mb-5 font-jetbrains-mono">
                {area.title}
              </h3>
              <p className="text-sm mb-6 grow font-jetbrains-mono">
                {area.description}
              </p>
              <LinkButton
                href="/about"
                ariaLabel="Learn more about HCI Lab"
                text="Learn More"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickIntroduction;
