import React from "react";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
