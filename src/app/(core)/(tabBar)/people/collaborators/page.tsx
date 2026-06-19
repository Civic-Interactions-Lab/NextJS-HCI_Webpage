import { getCollaborators } from "@/sanity/lib/people/getPeople";
import CollaboratorsView from "@/modules/people/ui/views/collaborators-view";

export default async function CollaboratorsPage() {
  const collaborators = await getCollaborators();
  return <CollaboratorsView collaborators={collaborators} />;
}
