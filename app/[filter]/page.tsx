import { Metadata } from "next";
import { notFound } from "next/navigation";
import MediaGrid from "@/components/MediaGrid";
import Heading from "@/components/Heading";
import mediaData from "@/data/media.json";
import { Media } from "@/types";

interface FilterPageProps {
  params: Promise<{
    filter: string;
  }>;
}

export async function generateMetadata({
  params,
}: FilterPageProps): Promise<Metadata> {
  const { filter } = await params;
  const capitalizedFilter = filter.charAt(0).toUpperCase() + filter.slice(1);
  return {
    title: `${capitalizedFilter} | JP Candelier`,
    description: `Explore ${capitalizedFilter} by JP Candelier`,
    openGraph: {
      title: `${capitalizedFilter} | JP Candelier`,
      description: `Explore ${capitalizedFilter} by JP Candelier`,
      images: [
        {
          url: `/og-image.png`,
          width: 1200,
          height: 630,
          alt: `JP Candelier - ${capitalizedFilter}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${capitalizedFilter} | JP Candelier`,
      description: `Explore ${capitalizedFilter} by JP Candelier`,
      images: [`/og-image.png`],
    },
  };
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { filter } = await params;
  const allowedFilters = ["photos", "designs", "music"];

  if (!allowedFilters.includes(filter.toLowerCase())) {
    notFound();
  }

  const filteredMedia = (mediaData as Media[])
    .filter((item) => {
      switch (filter.toLowerCase()) {
        case "photos":
          return item.type === "photo";
        case "designs":
          return item.type === "design";
        case "music":
          return item.type === "music" || item.type === "video";
        default:
          return false;
      }
    })
    .sort((a, b) => {
      const orderA =
        "filteredOrder" in a ? Number(a.filteredOrder) || Infinity : Infinity;
      const orderB =
        "filteredOrder" in b ? Number(b.filteredOrder) || Infinity : Infinity;
      return orderA - orderB;
    });

  return (
    <>
      <Heading level={1}>
        {filter.charAt(0).toUpperCase() + filter.slice(1)}
      </Heading>
      <MediaGrid media={filteredMedia} />
    </>
  );
}

export async function generateStaticParams() {
  return [{ filter: "photos" }, { filter: "designs" }, { filter: "music" }];
}
