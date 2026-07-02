import { getAlumni } from "@/sanity/lib/people/getPeople";
import AlumniView from "@/modules/people/ui/views/alumni-view";

export default async function AlumniPage() {
  const alumni = await getAlumni();
  return <AlumniView alumni={alumni} />;
}
