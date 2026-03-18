"use client";

import React, { useState, useMemo } from "react";
import PersonCard from "../components/PersonCard";
import { People } from "../../../../../sanity.types";
import { LinkButton } from "@/components/AppButton";
import RoleLegend, {
  FilterState,
} from "@/modules/people/ui/components/RoleLegend";

interface PeopleViewProps {
  currentSub?: string;
  currentMembers: People[];
  alumni: People[];
  collaborators: People[];
}

const PeopleView = ({
  currentSub,
  currentMembers,
  alumni,
  collaborators,
}: PeopleViewProps) => {
  const [filters, setFilters] = useState<FilterState>({
    status: [],
  });

  const activeSection = currentSub || "current";

  const getPeopleData = () => {
    switch (activeSection) {
      case "alumni":
        return alumni;
      case "collaborators":
        return collaborators;
      default:
        return currentMembers;
    }
  };

  const people = getPeopleData();

  const filteredPeople = useMemo(() => {
    if (!people) return [];

    // Collaborators are never filtered - always show all
    if (activeSection === "collaborators") return people;

    // If no filters are selected, show all people
    const hasActiveFilters = filters.status.length > 0;

    if (!hasActiveFilters) return people;

    return people.filter((person) => {
      let matchesFilter: boolean | undefined = true;

      // Status filter
      if (filters.status.length > 0) {
        matchesFilter =
          matchesFilter &&
          person.status &&
          filters.status.includes(person.status);
      }

      return matchesFilter;
    });
  }, [people, filters, activeSection]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  if (!people || people.length === 0) {
    return (
      <div className="flex-1 flex flex-col h-32 items-center justify-center">
        <p className="text-muted-foreground text-center">
          No {activeSection === "current" ? "current members" : activeSection}{" "}
          found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {activeSection === "current" && (
        <div className="p-4 md:p-6 xl:p-8 mb-8 border-2 border-primary-red-800">
          <p className="font-jetbrains-mono text-sm md:text-base xl:text-lg mb-6">
            <span className="text-primary-red-800 font-bold uppercase">
              MEET OUR CURRENT LAB MEMBERS
            </span>{" "}
            — PhD candidates, master&apos;s students, undergraduate researchers,
            and participants in the Research Scholars Program—who bring
            creativity, curiosity, and collaboration to every project. Together,
            we explore ideas, share knowledge, and support one another&apos;s
            growth as we advance our lab&apos;s research and impact.
          </p>

          <div className="text-center">
            <LinkButton href="/join" text="Apply Here" ariaLabel="Apply Here" />
          </div>
        </div>
      )}

      {/* Only show filters for current members and alumni */}
      {(activeSection === "current" || activeSection === "alumni") && (
        <RoleLegend onFilterChange={handleFilterChange} />
      )}

      {/* Show count when filters are active and in a filterable section */}
      {(activeSection === "current" || activeSection === "alumni") &&
        filters.status.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 font-jetbrains-mono">
              Showing {filteredPeople.length} of {people.length}{" "}
              {activeSection === "current" ? "members" : activeSection}
            </p>
          </div>
        )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-3">
        {filteredPeople.map((person: People, index: number) => (
          <PersonCard
            key={person._id || `${person.name}-${index}`}
            person={person}
            index={index}
          />
        ))}
      </div>

      {/* Show message when no results match filters in filterable sections */}
      {(activeSection === "current" || activeSection === "alumni") &&
        filteredPeople.length === 0 &&
        filters.status.length > 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center mb-4">
              No members match the selected filters.
            </p>
            <p className="text-sm text-gray-500 text-center">
              Try adjusting your filter selections to see more results.
            </p>
          </div>
        )}
    </div>
  );
};

export default PeopleView;
