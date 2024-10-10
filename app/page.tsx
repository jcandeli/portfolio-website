import { Metadata } from "next";
import MediaGrid from "@/components/MediaGrid";
import mediaData from "@/data/media.json";

export const metadata: Metadata = {
  title: "JP Candelier",
  description: "Explore the creative works by JP Candelier",
};

export default function Home() {
  return (
    <>
      <h1>JP Candelier</h1>
      <a id="main-content" />
      <MediaGrid media={mediaData} />
    </>
  );
}
