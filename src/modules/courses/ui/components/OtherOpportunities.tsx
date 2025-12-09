import React from "react";
import { BorderTitle } from "@/components/AppTitle";

const OtherOpportunities = () => {
  const organizations = [
    "OwlHacks",
    "ACM",
    "ACM-W",
    "TUDev",
    "Code for Philly",
    "PhillyCHI",
  ];

  return (
    <div className="flex flex-col space-y-4 px-6 py-6 bg-gray-100 rounded-xl">
      <BorderTitle title="Other Opportunities" />

      <div className="flex flex-col">
        <p className="text-sm md:text-base lg:text-lg mb-6">
          There are other ways to get involved with us. We host the{" "}
          <span className="font-semibold">OwlHacks</span> hackathon here at
          Temple and you can develop your leadership skills. Our members are
          very involved with <span className="font-semibold">ACM</span> and{" "}
          <span className="font-semibold">ACM-W</span> where you can learn more
          about career development. Finally, we have partnered with{" "}
          <span className="font-semibold">TUDev</span> to provide more
          development skills that extend beyond your classes. So even if we
          don&apos;t have space right now, there are many ways to get involved
          with us.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {organizations.map((org, index) => (
            <div
              key={index}
              className="rounded-full bg-gray-300 px-4 py-2 text-sm font-medium"
            >
              {org}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherOpportunities;
