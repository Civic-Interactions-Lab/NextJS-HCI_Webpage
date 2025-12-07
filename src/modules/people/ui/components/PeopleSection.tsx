import React from "react";

interface PeopleSectionProps {
  category: "current" | "alumni" | "collaborators";
}

const PeopleSection = ({ category }: PeopleSectionProps) => {
  // This will work with your Sanity data
  // const people = usePeopleByCategory(category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Your people cards will go here */}
      <div className="p-4 border rounded-lg">
        <p>People for {category} category</p>
      </div>
    </div>
  );
};

export default PeopleSection;
