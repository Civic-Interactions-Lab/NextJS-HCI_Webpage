"use client";

import React from "react";

const ResearchAtHci = () => {
  return (
    <div className="border-l-6 md:border-l-8 lg:border-l-12 border-primary-red-800 pl-6">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
        <div className="w-full md:w-1/2">
          <iframe
            src="https://www.youtube.com/embed/Pq-d6wipGRQ?si=wMHHvnP0XLIiwFAc"
            title="Community Research Video"
            className="w-full h-48 lg:h-56 rounded-xl overflow-hidden border border-gray-400"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
          <p className="text-xs text-gray-600 mt-2">
            Generative AI & undergrad CS education – S. MacNeil & colleagues |
            Computing education research
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <div className="mb-8">
            <p className="text-base md:text-xl lg:text-2xl font-jetbrains-mono font-medium">
              <span className="text-primary-red-800 uppercase">
                HERE AT HCI LAB,
              </span>{" "}
              our work in Human-Computer Interaction goes beyond AI and data.
              Our mission is to drive discovery, expand critical thinking, and
              inspire collaboration.
            </p>
          </div>
        </div>
      </div>

      <p className="text-base md:text-xl lg:text-2xl font-jetbrains-mono font-medium text-gray-800 md:mt-4">
        Through research and design, we aim to inspire the brilliant minds of
        Temple CS and beyond, to create a lasting impact on how people and
        technology interact.
      </p>
    </div>
  );
};

export default ResearchAtHci;
