"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import PeopleSection from "@/modules/people/ui/components/PeopleSection";

const PeopleView = () => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("sub") || "current";

  const getActiveTab = (): "current" | "alumni" | "collaborators" => {
    switch (activeCategory) {
      case "alumni":
        return "alumni";
      case "collaborators":
        return "collaborators";
      default:
        return "current";
    }
  };

  const currentTab = getActiveTab();

  const getPageTitle = () => {
    switch (currentTab) {
      case "current":
        return "Current Members";
      case "alumni":
        return "Alumni";
      case "collaborators":
        return "Collaborators";
      default:
        return "Our Team";
    }
  };

  const getPageDescription = () => {
    switch (currentTab) {
      case "current":
        return "Active members of our research team";
      case "alumni":
        return "Former team members and where they are now";
      case "collaborators":
        return "External partners and collaborators";
      default:
        return "Meet our team";
    }
  };

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
        <p className="text-gray-600">{getPageDescription()}</p>
      </div>

      <PeopleSection category={currentTab} />
    </div>
  );
};

export default PeopleView;
