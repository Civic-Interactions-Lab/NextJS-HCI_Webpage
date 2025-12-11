import React from "react";
import { BorderTitle } from "@/components/AppTitle";

const CourseList = () => {
  return (
    <div className="flex flex-col space-y-4 px-6 py-6 bg-gray-100 rounded-xl">
      <BorderTitle title="Courses" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-6">
            Here are the current courses:
          </h3>

          <ul className="space-y-1 text-sm md:text-base lg:text-lg">
            <li>CIS 1014: AI for Everyone</li>
            <li>CIS 3655: Human-AI Interaction</li>
            <li>CIS 3755: Introduction to Data Visualization</li>
            <li>CIS 4398: Projects in CS</li>
            <li>CIS 3603: User Experience Design</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-1 text-sm md:text-base lg:text-lg">
          <p>For full course descriptions and more information, visit</p>
          <a
            href="https://stevemacn.github.io/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            stevemacn.github.io/courses
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
