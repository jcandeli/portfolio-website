"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { Design, Photo, Video } from "@/types";
import MediaCard from "@/components/MediaCard";

interface DetailsPageProps {
  mediaItem: Photo | Design | Video;
  type: "photo" | "design" | "video";
}

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  color: var(--muted-foreground);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--foreground);
  }
`;

export function DetailsPage({ mediaItem, type }: DetailsPageProps) {
  const mediaType = type === "video" ? "video" : `${type}s`;

  return (
    <div>
      <BackLink href={`/${mediaType.toLowerCase()}`}>
        ← {mediaType.toUpperCase()}
      </BackLink>
      <MediaCard media={mediaItem} showOverlay={false} />
    </div>
  );
}
