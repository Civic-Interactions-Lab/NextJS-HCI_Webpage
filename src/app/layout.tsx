import type { Metadata } from "next";
import { Roboto, JetBrains_Mono, Outfit, Oxanium } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { SanityLive } from "@/sanity/lib/live";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["500"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Temple University HCI Lab",
  description: "Human-Computer Interaction Research at Temple University",
  icons: {
    icon: [
      { url: "/logos/hci-logo.png", media: "(prefers-color-scheme: light)" },
      { url: "/logos/hci-logo.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${outfit.variable} ${jetBrainsMono.variable} ${oxanium.variable} min-h-screen flex flex-col antialiased`}
      >
        <main className="flex-1">{children}</main>
        <SanityLive />
      </body>
    </html>
  );
}
