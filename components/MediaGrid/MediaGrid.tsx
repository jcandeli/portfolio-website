"use client";

import { useEffect } from "react";
import Grid, { GridItem } from "@/components/Grid";
import MediaCard from "@/components/MediaCard";
import { Media, Photo } from "@/types";
import { useGlobal } from "@/contexts/GlobalContext";

export default function MediaGrid({ media }: { media: Media[] }) {
  const { setSelectedMedia, setCurrentMediaList } = useGlobal();

  useEffect(() => {
    setCurrentMediaList(media);
  }, [media, setCurrentMediaList]);

  const handleMediaClick = (media: Media) => {
    if (
      media.type === "photo" ||
      media.type === "design" ||
      media.type === "video"
    ) {
      setSelectedMedia(media);
    }
  };

  return (
    <Grid>
      {media.map((media: Media) => (
        <GridItem
          key={media.id}
          orientation={
            media.type === "photo" ||
            media.type === "design" ||
            media.type === "video"
              ? (media as Photo).orientation
              : undefined
          }
          disableBorderRadius={media.type === "music"}
        >
          {media.type === "music" ? (
            <MediaCard media={media} />
          ) : (
            <button
              onClick={() => handleMediaClick(media)}
              className="h-full w-full"
              aria-haspopup="dialog"
              aria-label={`View ${media.title}`}
              aria-controls="media-modal"
            >
              <MediaCard media={media} />
            </button>
          )}
        </GridItem>
      ))}
    </Grid>
  );
}
