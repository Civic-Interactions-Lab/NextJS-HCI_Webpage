import React from "react";
import HciNavbar from "@/components/hci-navbar";
import CallToActionSection from "@/components/call-to-action-section";
import Footer from "@/components/Footer";

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
