import type { Metadata } from "next";
import { Roboto, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://hci.temple.edu";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Temple University HCI Lab",
    template: "%s | Temple University HCI Lab",
  },
  description:
    "Temple University's Human-Computer Interaction Lab explores AI, accessibility, learning, visualization, and human-centered computing research.",
  applicationName: "Temple University HCI Lab",
  keywords: [
    "Temple University",
    "Temple HCI Lab",
    "Human-Computer Interaction",
    "HCI research",
    "AI research",
    "Accessibility",
    "Visualization",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Temple University HCI Lab",
    title: "Temple University HCI Lab",
    description:
      "Human-centered computing research at Temple University across AI, accessibility, learning, and visualization.",
    images: [
      {
        url: "/logos/hci-logo.png",
        width: 512,
        height: 512,
        alt: "Temple University HCI Lab logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Temple University HCI Lab",
    description:
      "Human-centered computing research at Temple University across AI, accessibility, learning, and visualization.",
    images: ["/logos/hci-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${roboto.variable} ${outfit.variable} ${jetBrainsMono.variable} min-h-screen flex flex-col antialiased`}
        >
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
