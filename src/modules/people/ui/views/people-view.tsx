import React from "react";
import PersonCard from "../components/PersonCard";
import {
  getAlumni,
  getCollaborators,
  getCurrentMembers,
} from "@/sanity/lib/people/getPeople";
import { People } from "../../../../../sanity.types";
import { LinkButton } from "@/components/AppButton";

interface PeopleViewProps {
  currentSub?: string;
}

const PeopleView = async ({ currentSub }: PeopleViewProps) => {
  const [currentMembers, alumni, collaborators] = await Promise.all([
    getCurrentMembers(),
    getAlumni(),
    getCollaborators(),
  ]);

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
        <div className="p-4 md:p-6 xl:p-8  mb-8 border-2 border-primary-red-800">
          <p className="font-jetbrains-mono text-sm md:text-base xl:text-lg mb-6">
            <span className="text-primary-red-800 font-bold uppercase">
              MEET OUR CURRENT LAB MEMBERS
            </span>{" "}
            — PhD candidates, master’s students, undergraduate researchers, and
            participants in the Research Scholars Program—who bring creativity,
            curiosity, and collaboration to every project. Together, we explore
            ideas, share knowledge, and support one another’s growth as we
            advance our lab’s research and impact.
          </p>

          <div className="text-center">
            <LinkButton href="/join" text="Apply Here" ariaLabel="Apply Here" />
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-3">
        {people.map((person: People, index: number) => (
          <PersonCard
            key={person._id || `${person.name}-${index}`}
            person={person}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PeopleView;
