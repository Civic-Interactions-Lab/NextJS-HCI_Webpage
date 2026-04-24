import React, { Suspense } from "react";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnotationOverlayWrapper from "@/modules/annotations/ui/components/AnnotationOverlayWrapper";
import Loading from "@/components/Loading";
import { auth } from "@clerk/nextjs/server";

export default async function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  return (
    <Suspense fallback={<Loading />}>
      <AnnotationOverlayWrapper enabled={Boolean(userId)}>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </AnnotationOverlayWrapper>
    </Suspense>
  );
}
