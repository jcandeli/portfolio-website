import allMedia from "@/data/media.json";
import { Design, Media, Photo, Video } from "@/types";
import { notFound } from "next/navigation";
import { DetailsPage } from "./DetailsPage";
import { createMediaDetailsUrl } from "@/utils/url";

interface MediaPageProps {
  params: {
    type: Media["type"];
    slug: string;
  };
}

// Helper to extract ID from slug
function extractIdFromSlug(slug: string) {
  // Updated format: "title-goes-here.__id-123"
  const [, id] = slug.split(".__id-");
  return id;
}

export async function generateStaticParams() {
  // Filter out music items before generating paths
  const filteredMedia = allMedia.filter((item) => item.type !== "music");

  return filteredMedia.map((item) => ({
    type: item.type,
    slug:
      createMediaDetailsUrl(item.type, item.title, item.id).split("/").pop() ||
      "",
  }));
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { type, slug } = params;
  const id = extractIdFromSlug(slug);

  // Return 404 immediately if type is music
  if (type.toLowerCase() === "music") {
    notFound();
  }

  const mediaItem = allMedia.find(
    (item) => item.id === id && item.type.toLowerCase() === type.toLowerCase()
  );

  if (!mediaItem) {
    notFound();
  }

  return <DetailsPage mediaItem={mediaItem as Video | Photo | Design} />;
}
