import { Metadata } from "next";
import MediaGrid from "@/components/MediaGrid";
import mediaData from "@/app/data/media.json";

export const metadata: Metadata = {
  title: "Media Grid",
  description: "A grid displaying various media items",
};

export default function Home() {
  return (
    <main>
      <MediaGrid media={mediaData} />
    </main>
  );
}
