import Navigation from "@/components/Navigation";
import { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
  display: "block",
  preload: true,
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A showcase of my work",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-white text-black p-2 z-50"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
