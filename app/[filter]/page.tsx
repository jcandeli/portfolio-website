import { Metadata } from "next";
import MediaGrid from "@/components/MediaGrid";
import mediaData from "@/data/media.json";
import { Media } from "@/types";

interface FilterPageProps {
  params: {
    filter: string;
  };
}

export const generateMetadata = ({ params }: FilterPageProps): Metadata => {
  const capitalizedFilter =
    params.filter.charAt(0).toUpperCase() + params.filter.slice(1);
  return {
    title: `${capitalizedFilter} | JP Candelier`,
    description: `Explore ${capitalizedFilter} works by JP Candelier`,
  };
};

export default function FilterPage({ params }: FilterPageProps) {
  const { filter } = params;
  const filteredMedia = mediaData.filter((item: Media) => {
    switch (filter.toLowerCase()) {
      case "photos":
        return item.type === "photo";
      case "designs":
        return item.type === "design";
      case "music":
        return item.type === "music" || item.type === "video";
      default:
        return true;
    }
  });

  return (
    <>
      <h1>{filter.charAt(0).toUpperCase() + filter.slice(1)}</h1>
      <a id="main-content" />
      <MediaGrid media={filteredMedia} />
    </>
  );
}
