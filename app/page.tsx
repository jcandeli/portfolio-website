import { MediaGrid } from "./components/MediaGrid";
import mediaData from "./data/media.json";

export default function Home() {
  return (
    <main>
      <h1>My Portfolio</h1>
      <MediaGrid media={mediaData} />
    </main>
  );
}
