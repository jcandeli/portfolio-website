import Navigation from "@/components/Navigation";
import FontLoader from "@/components/FontLoader";
import { Metadata } from "next";
import "./globals.css";

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
      <FontLoader />
      <body>
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
