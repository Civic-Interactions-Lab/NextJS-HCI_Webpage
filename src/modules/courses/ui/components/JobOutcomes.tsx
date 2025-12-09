import React from "react";
import { BorderTitle } from "@/components/AppTitle";

const JobOutcomes = () => {
  const companies = [
    "Google",
    "Microsoft",
    "SAP",
    "Comcast",
    "JP Morgan",
    "URBN",
  ];

  return (
    <div className="flex flex-col space-y-4 px-6 py-6 bg-gray-100 rounded-xl">
      <BorderTitle title="Job Outcomes" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <div className="flex flex-col space-y-1 mb-6">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold">
              What can you do with HCI experience?
            </h3>
            <p className="text-sm md:text-base lg:text-lg">
              Recent job titles obtained by lab alumni:
            </p>
          </div>

          <ul className="space-y-1 text-sm md:text-base lg:text-lg list-disc ml-4">
            <li>Software Engineer</li>
            <li>UX/UI Designer</li>
            <li>UX Researcher</li>
            <li>UX Specialist</li>
            <li>Information Architect</li>
            <li>Design Researcher</li>
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col space-y-1 mb-6">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-center md:text-start">
              Where will you work?
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-center md:text-start">
              Recent companies / organizations that alumni have joined:
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {companies.map((company, index) => (
              <div
                key={index}
                className="rounded-full bg-gray-300 px-4 py-2 text-sm font-medium"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobOutcomes;
