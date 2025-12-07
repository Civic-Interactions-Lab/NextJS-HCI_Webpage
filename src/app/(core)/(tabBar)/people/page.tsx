import React from "react";
import PeopleView from "@/modules/people/ui/views/people-view";

interface PageProps {
  searchParams: Promise<{ sub?: string }> | { sub?: string };
}

const PeoplePage = async ({ searchParams }: PageProps) => {
  const { sub } = await searchParams;

  return <PeopleView currentSub={sub} />;
};

export default PeoplePage;
