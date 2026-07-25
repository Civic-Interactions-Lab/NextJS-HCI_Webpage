import SponsorsView from "@/modules/sponsors/ui/views/sponsors-view";
import { getSponsors } from "@/sanity/lib/sponsors/getSponsors";

export default async function SponsorsPage() {
  const sponsors = await getSponsors();
  return <SponsorsView sponsors={sponsors} />;
}
