import React from "react";
import HciNavbar from "@/components/hci-navbar";
import HomeCta from "@/components/home-cta";
import Footer from "@/components/Footer";
import AnnotationOverlayWrapper from "@/modules/annotations/ui/components/AnnotationOverlayWrapper";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnnotationOverlayWrapper>
      <div className="min-h-screen flex flex-col">
        <HciNavbar />
        {children}
        <HomeCta />
        <Footer />
      </div>
    </AnnotationOverlayWrapper>
  );
}
