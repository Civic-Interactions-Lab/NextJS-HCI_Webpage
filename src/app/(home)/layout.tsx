import React from "react";
import HciNavbar from "@/components/hci-navbar";
import CallToActionSection from "@/modules/home/ui/components/call-to-action-section";
import Footer from "@/components/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <HciNavbar />
      {children}
      <CallToActionSection />
      <Footer />
    </div>
  );
}
