import React from "react";
import Footer from "@/components/footer";
import HciNavbar from "@/components/hci-navbar";
import Hero from "@/components/hero";

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <HciNavbar />
      <Hero />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
