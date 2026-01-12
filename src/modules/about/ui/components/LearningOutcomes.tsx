import React from "react";
import { BorderHeading } from "@/components/AppTitle";

interface LearningOutcome {
  id: number;
  category: string;
  description: string;
  badgeColor: string;
  radius: string;
}

const learningOutcomes: LearningOutcome[] = [
  {
    id: 1,
    category: "LEADERSHIP",
    description:
      "think critically, collaborate with others, and communicate complex ideas simply.",
    badgeColor: "bg-sky",
    radius: "rounded-2xl",
  },
  {
    id: 2,
    category: "Design",
    description:
      "learn to talk large systemic problems with solutions that actually meet people's needs",
    badgeColor: "bg-grass",
    radius: "rounded-full",
  },
  {
    id: 3,
    category: "Development",
    description:
      "learn to apply AI, ML, Web Dev, and Software Engineering skills on real projects that get used by real people.",
    badgeColor: "bg-gold",
    radius: "rounded",
  },
];

const LearningOutcomes = () => {
  return (
    <div className="flex flex-col gap-6 justify-start items-start text-start">
      <BorderHeading title="Learning Outcomes" />

      <div className="flex flex-col gap-4 w-full">
        {learningOutcomes.map((outcome) => (
          <div
            key={outcome.id}
            className="flex flex-col md:flex-row gap-3 md:gap-4 items-center"
          >
            <div className="w-full md:w-44 text-center">
              <div
                className={`text-white px-4 md:px-6 py-2 md:py-3 ${outcome.badgeColor} ${outcome.radius} font-semibold text-sm md:text-base uppercase inline-block`}
              >
                {outcome.category}
              </div>
            </div>
            <p className="text-sm md:text-lg xl:text-xl text-gray-700 leading-relaxed flex-1 text-center md:text-left">
              {outcome.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningOutcomes;
