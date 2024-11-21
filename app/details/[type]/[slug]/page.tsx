import allMedia from "@/data/media.json";
import { Media } from "@/types";
import { notFound } from "next/navigation";
import { DetailsPage } from "./DetailsPage";

interface MediaPageProps {
  params: {
    type: Media["type"];
    slug: string;
  };
}

// Helper to extract ID from slug
function extractIdFromSlug(slug: string) {
  // Assuming format: "title-goes-here--123" where --123 is the ID
  const [, id] = slug.split("--");
  return id;
}

export async function generateStaticParams() {
  return allMedia.map((item) => ({
    type: item.type.toLowerCase(),
    // Create slug from title and ID using -- as delimiter
    slug: `${item.title.toLowerCase().replace(/\s+/g, "-")}--${item.id}`,
  }));
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { type, slug } = params;
  const id = extractIdFromSlug(slug);

  const mediaItem = allMedia.find(
    (item) => item.id === id && item.type.toLowerCase() === type.toLowerCase()
  );

  if (!mediaItem) {
    notFound();
  }

  return <DetailsPage mediaItem={mediaItem} type={type} />;
}
