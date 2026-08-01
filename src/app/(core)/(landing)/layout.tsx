import React from "react";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="space-y-32 pb-16">{children}</div>;
}
