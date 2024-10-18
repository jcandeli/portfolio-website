"use client";

import Grid, { GridItem } from "@/components/Grid";
import Image from "@/components/Image";
import MediaCard from "@/components/MediaCard";
import Modal from "@/components/Modal";
import { Design, Media, Photo } from "@/types";
import emotionStyled from "@emotion/styled";
import { useState } from "react";

const Heading = emotionStyled.h1`
  font-size: min(23vw, 326px);
  line-height: 0.85;
`;

const Subheading = emotionStyled.h2`
  font-size: 3rem;
  line-height: 0.85;
`;

const ModalContent = emotionStyled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageCaption = emotionStyled.figcaption`
  width: 75%;
  align-self: flex-start;
  margin-block: 0 2rem;
`;

export default function MediaGrid({
  media,
  heading,
  subheading,
}: {
  media: Media[];
  heading: string;
  subheading?: string;
}) {
  const [selectedMedia, setSelectedMedia] = useState<Photo | Design | null>();

  return (
    <>
      <Heading>{heading}</Heading>
      {subheading && <Subheading>{subheading}</Subheading>}
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
            <ModalContent>
              <ImageCaption>
                <h3>{selectedMedia.title}</h3>
                {selectedMedia.type === "photo" && (
                  <>
                    {selectedMedia.location && <p>{selectedMedia.location}</p>}
                    {selectedMedia.camera && <p>{selectedMedia.camera}</p>}
                  </>
                )}
              </ImageCaption>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image media={selectedMedia} />
            </ModalContent>
          </Modal>
        )}
      </Grid>
    </>
  );
}
