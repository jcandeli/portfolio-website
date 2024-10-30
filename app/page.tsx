import Heading from "@/components/Heading";
import MediaGrid from "@/components/MediaGrid";
import mediaData from "@/data/media.json";
import { Media } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JP Candelier - Creative Works",
  description: "Creative Expressions in Pixels, Notes, and Colors.",
};

export default function Home() {
  return (
    <>
      <Heading level={1}>JP Candelier</Heading>
      <Heading level={2}>
        Creative Expressions in Pixels, Notes, and Colors.
      </Heading>
      <MediaGrid media={mediaData as Media[]} />
    </>
  );
}
