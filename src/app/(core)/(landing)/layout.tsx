import React from "react";
import { headers } from "next/headers";
import Hero from "@/components/Hero";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  return (
    <>
      <Hero pathname={pathname} />
      <main className="flex-1 flex flex-col overflow-hidden mt-12">
        {children}
      </main>
    </>
  );
}
