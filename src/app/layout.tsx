import type { Metadata } from "next";
import { Roboto, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { SanityLive } from "@/sanity/lib/live";

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
  title: "Temple University HCI Lab",
  description: "Human-Computer Interaction Research at Temple University",
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
          <ConvexClientProvider>
            <main className="flex-1">{children}</main>
            <SanityLive />
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
