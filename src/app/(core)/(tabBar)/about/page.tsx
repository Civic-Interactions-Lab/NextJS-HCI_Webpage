import React, { Suspense } from "react";
import AboutView from "@/modules/about/ui/views/about-view";
import EventsView from "@/modules/about/ui/views/events-view";
import NewsView from "@/modules/about/ui/views/news-view";
import ContactUsView from "@/modules/about/ui/views/contact-us-view";

interface PageProps {
  searchParams: Promise<{ sub?: string }> | { sub?: string };
}

const AboutPage = async ({ searchParams }: PageProps) => {
  const { sub } = await searchParams;

  const renderContent = () => {
    switch (sub) {
      case "events":
        return <EventsView />;
      case "news":
        return <NewsView />;
      case "contact-us":
        return <ContactUsView />;
      default:
        return <AboutView />;
    }
  };

  return (
    <div className="flex-1 space-y-12 mt-0 md:mt-6 mb-16 relative">
      <Suspense fallback={<div>Loading...</div>}>{renderContent()}</Suspense>
    </div>
  );
};
export default AboutPage;
