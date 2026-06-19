import { getCurrentMembers } from "@/sanity/lib/people/getPeople";
import PeopleView from "@/modules/people/ui/views/people-view";

export default async function PeoplePage() {
  const currentMembers = await getCurrentMembers();
  return <PeopleView currentMembers={currentMembers} />;
}
