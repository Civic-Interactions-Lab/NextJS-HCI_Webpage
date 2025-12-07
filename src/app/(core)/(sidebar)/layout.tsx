import { headers } from "next/headers";
import { ReactNode } from "react";
import SidebarClient from "@/components/SidebarClient";
import Hero from "@/components/Hero";

export default async function SidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Get the pathname from headers (server-side)
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  return (
    <div className="max-w-7xl mx-auto lg:px-0 py-0 overflow-hidden">
      <Hero pathname={pathname} />
      <div className="flex gap-8 overflow-hidden">
        {/* Client-side sidebar that receives pathname as prop */}
        <SidebarClient pathname={pathname} />

        {/* Main Content */}
        <main className="flex-1 pt-4 w-full xl:max-w-6xl overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
