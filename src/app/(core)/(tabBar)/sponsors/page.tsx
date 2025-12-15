import React from "react";
import SponsorsView from "@/modules/sponsors/ui/views/sponsors-view";
import BecomeASponsorView from "@/modules/sponsors/ui/views/become-a-sponsor-view";

interface PageProps {
  searchParams: Promise<{ sub?: string }> | { sub?: string };
}

const SponsorsPage = async ({ searchParams }: PageProps) => {
  const { sub } = await searchParams;

  const renderContent = () => {
    switch (sub) {
      case "interested-in-sponsoring":
        return <BecomeASponsorView />;
      default:
        return <SponsorsView />;
    }
  };

  return (
    <div className="flex-1 space-y-12 mt-0 md:mt-6 mb-16 relative">
      {renderContent()}
    </div>
  );
};
export default SponsorsPage;
