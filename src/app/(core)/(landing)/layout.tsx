import React, { Suspense } from "react";
import Hero from "@/components/hero";
import Loading from "@/components/Loading";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Hero />
        <main className="flex-1 flex flex-col overflow-hidden mt-12">
          {children}
        </main>
      </Suspense>
    </>
  );
}
