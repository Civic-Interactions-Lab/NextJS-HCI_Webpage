import React, { Suspense } from "react";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import HciNavbar from "@/components/hci-navbar";
import Hero from "@/components/hero";

export default async function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex flex-col">
        <HciNavbar />
        <Hero />
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-20">
          {children}
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
