import { Metadata } from "next";
import MediaGrid from "@/components/MediaGrid";
import Heading from "@/components/Heading";
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
};

export default function FilterPage({ params }: FilterPageProps) {
  const { filter } = params;
  const filteredMedia = (mediaData as Media[]).filter((item) => {
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
