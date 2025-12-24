import React, { Suspense } from "react";
import PeopleView from "@/modules/people/ui/views/people-view";
import {
  getAlumni,
  getCollaborators,
  getCurrentMembers,
} from "@/sanity/lib/people/getPeople";
import Loading from "@/components/Loading";

interface PageProps {
  searchParams: Promise<{ sub?: string }> | { sub?: string };
}

const PeoplePage = async ({ searchParams }: PageProps) => {
  const { sub } = await searchParams;

  const [currentMembers, alumni, collaborators] = await Promise.all([
    getCurrentMembers(),
    getAlumni(),
    getCollaborators(),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <PeopleView
        currentSub={sub}
        currentMembers={currentMembers}
        alumni={alumni}
        collaborators={collaborators}
      />
    </Suspense>
  );
};

export default PeoplePage;
