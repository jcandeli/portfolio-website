import { Metadata } from "next";
import MediaGrid from "@/components/MediaGrid";
import mediaData from "@/data/media.json";
import { Media } from "@/types";

export const metadata: Metadata = {
  title: "JP Candelier - Creative Works",
  description: "Creative Expressions in Pixels, Notes, and Colors.",
};

export default function Home() {
  return (
    <MediaGrid
      media={mediaData as Media[]}
      heading="JP Candelier"
      // subheading="Creative Expressions in Pixels, Notes, and Colors."
    />
  );
}
