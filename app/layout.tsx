import Navigation from "@/components/Navigation";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
  display: "block",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jpcandelier.com"),
  title: "JP Candelier - Creative Works",
  description: "Creative Expressions in Pixels, Notes, and Colors.",
  openGraph: {
    title: "JP Candelier - Creative Works",
    description: "Creative Expressions in Pixels, Notes, and Colors.",
    url: "https://jpcandelier.com",
    siteName: "JP Candelier",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JP Candelier - Creative Works",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JP Candelier - Creative Works",
    description: "Creative Expressions in Pixels, Notes, and Colors.",
    images: ["/og-image.png"],
  },
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
