"use client";

import Grid, { GridItem } from "@/components/Grid";
import MediaCard from "@/components/MediaCard";
import Modal from "@/components/Modal";
import { Design, Media, Photo } from "@/types";
import emotionStyled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";

const Heading = emotionStyled.h1`
  font-size: min(23vw, 326px);
  line-height: 0.85;
`;

export default function MediaGrid({
  media,
  heading,
}: {
  media: Media[];
  heading: string;
}) {
  const [selectedMedia, setSelectedMedia] = useState<Photo | Design | null>();

  return (
    <>
      <Heading>{heading}</Heading>
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
          >
            {media.type === "photo" || media.type === "design" ? (
              <button
                onClick={() => setSelectedMedia(media as Photo | Design)}
                className="h-full w-full"
                aria-haspopup="dialog"
                aria-label={`View ${media.title}`}
                aria-controls="media-modal"
              >
                <MediaCard media={media} />
              </button>
            ) : (
              <MediaCard media={media} />
            )}
          </GridItem>
        ))}

        {selectedMedia && (
          <Modal
            isOpen
            onClose={() => setSelectedMedia(null)}
            aria-label={`${selectedMedia.title} details`}
            id="media-modal"
          >
            <figure>
              <Image
                src={`/portfolio/${selectedMedia.type}/${selectedMedia.id}`}
                alt={selectedMedia.title}
                style={{ objectFit: "contain" }}
                fill
              />
              <figcaption>
                <h2>{selectedMedia.title}</h2>
                {selectedMedia.type === "photo" && (
                  <>
                    {selectedMedia.location && <p>{selectedMedia.location}</p>}
                    {selectedMedia.camera && <p>{selectedMedia.camera}</p>}
                  </>
                )}
              </figcaption>
            </figure>
          </Modal>
        )}
      </Grid>
    </>
  );
}
