import SponsorsView from "@/modules/sponsors/ui/views/sponsors-view";
import { getSponsors } from "@/sanity/lib/sponsors/getSponsors";

const SponsorsPage = async () => {
  const sponsors = await getSponsors();
  return <SponsorsView sponsors={sponsors} />;
};

export default SponsorsPage;
