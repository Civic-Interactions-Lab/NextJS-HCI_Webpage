import React from "react";
import { SectionHeading } from "@/components/AppTitle";
import Image from "next/image";
import Link from "next/link";

const companies = [
  {
    name: "Google",
    logo: "/logos/google.webp",
    href: "https://google.com",
  },
  {
    name: "Microsoft",
    logo: "/logos/microsoft.png",
    href: "https://microsoft.com",
  },
  {
    name: "SAP",
    logo: "/logos/sap.png",
    href: "https://sap.com",
  },
  {
    name: "Comcast",
    logo: "/logos/comcast.png",
    href: "https://corporate.comcast.com/",
  },
  {
    name: "JP Morgan",
    logo: "/logos/jpmorgan.png",
    href: "https://jpmorgan.com",
  },
];

const universities = [
  {
    name: "UMich",
    logo: "/logos/umich.png",
    href: "https://umich.edu",
  },
  {
    name: "UCSD",
    logo: "/logos/ucsd.png",
    href: "https://ucsd.edu",
  },
  {
    name: "MIT",
    logo: "/logos/mit.png",
    href: "https://mit.edu",
  },
  {
    name: "Georgia Tech",
    logo: "/logos/gtech.png",
    href: "https://gatech.edu",
  },
  {
    name: "Harvard",
    logo: "/logos/harvard.png",
    href: "https://harvard.edu",
  },
  {
    name: "UIUC",
    logo: "/logos/Illinoisu.png",
    href: "https://illinois.edu",
  },
];

const LogoBadge = ({
  name,
  logo,
  href,
}: {
  name: string;
  logo: string;
  href: string;
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center p-2 hover:scale-105 transition-transform"
  >
    <div className="relative min-w-12 h-8">
      <Image src={logo} alt={`${name} logo`} fill className="object-contain" />
    </div>
  </Link>
);

const JobOutcomes = () => {
  return (
    <div className="flex flex-col space-y-4 ">
      <SectionHeading title="Job Outcomes" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Job Titles */}
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

        {/* Companies + Universities */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col space-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold">
                Where will you work?
              </h3>
              <p className="text-sm md:text-base lg:text-lg">
                Recent companies alumni have joined:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {companies.map((company) => (
                <LogoBadge key={company.name} {...company} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col space-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold">
                Where will you study next?
              </h3>
              <p className="text-sm md:text-base lg:text-lg">
                Graduate schools alumni have attended:
              </p>
            </div>
            <div className="flex flex-wrap gap-1 md:gap-3">
              {universities.map((uni) => (
                <LogoBadge key={uni.name} {...uni} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOutcomes;
