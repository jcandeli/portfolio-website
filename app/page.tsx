import Banner from "@/components/Banner";
import MediaGrid from "@/components/MediaGrid";
import mediaData from "@/data/media.json";
import { Media } from "@/types";

export default function Home() {
  return (
    <>
      <Banner />
      <MediaGrid media={mediaData as Media[]} />
    </>
  );
}
