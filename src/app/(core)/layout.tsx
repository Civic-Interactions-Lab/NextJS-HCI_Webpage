import React, { Suspense } from "react";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnotationOverlay from "@/modules/annotations/ui/components/AnnotationOverlay";
import { Loader } from "lucide-react";

export default async function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loader />}>
      <AnnotationOverlay>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </AnnotationOverlay>
    </Suspense>
  );
}
