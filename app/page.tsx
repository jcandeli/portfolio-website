import { Metadata } from "next";
import MediaGrid from "@/components/MediaGrid";
import mediaData from "@/data/media.json";
import { Media } from "@/types";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "block",
  variable: "--font-bebas-neue",
  preload: true,
});

const titleStyle = {
  fontSize: "min(25vw, 348px)",
  lineHeight: "0.85",
  letterSpacing: "max(-1vw, -0.5rem)",
  textAlign: "center",
  position: "relative",
  zIndex: 1,
} as const;

export const metadata: Metadata = {
  title: "JP Candelier - Creative Works",
  description: "Creative Expressions in Pixels, Notes, and Colors.",
};

export default function Home() {
  return (
    <>
      <h1 className={bebasNeue.className} style={titleStyle}>
        JP Candelier
      </h1>
      <MediaGrid media={mediaData as Media[]} />
    </>
  );
}
