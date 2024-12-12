import Navigation from "@/components/Navigation";
import { GlobalProvider } from "@/contexts/GlobalContext";
import { Metadata } from "next";
import { StyledBody } from "@/components/StyledBody";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jpcandelier.com"),
  title: "JP Candelier - Creative Works",
  description: "Exploring Creativity Through Lens, Sound, and Design.",
  openGraph: {
    title: "JP Candelier - Creative Works",
    description: "Exploring Creativity Through Lens, Sound, and Design.",
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
    description: "Exploring Creativity Through Lens, Sound, and Design.",
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
      <GlobalProvider>
        <StyledBody>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-white text-black p-2 z-50"
          >
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
        </StyledBody>
      </GlobalProvider>
    </html>
  );
}
