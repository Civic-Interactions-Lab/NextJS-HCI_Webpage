import { headers } from "next/headers";
import { ReactNode } from "react";
import TabBarClient from "@/components/TabBarClient";
import Hero from "@/components/Hero";

export default async function TabBarLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  return (
    <div>
      <Hero pathname={pathname} />

      <div className="flex flex-col flex-1 max-w-7xl mx-auto overflow-hidden mt-6 mb-12 px-6 md:px-12 space-y-6">
        <TabBarClient />

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
