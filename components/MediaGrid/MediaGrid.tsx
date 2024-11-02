"use client";

import Grid, { GridItem } from "@/components/Grid";
import Heading from "@/components/Heading";
import MediaCard from "@/components/MediaCard";
import Modal from "@/components/Modal";
import { Design, Media, Photo } from "@/types";
import styled from "@emotion/styled";
import { useState } from "react";

const Subheading = styled.h2`
  font-size: 3rem;
  line-height: 0.85;
`;

const ModalContent = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageCaption = styled.figcaption`
  width: 75%;
  align-self: flex-start;
  margin-block: 0 2rem;
`;

const Image = styled.img`
  object-fit: cover;
  max-width: 70vw;
  max-height: 70vh;
  @media (max-width: 768px) {
    max-width: 90vw;
    max-height: 90vh;
  }
`;

export default function MediaGrid({
  media,
  subheading,
}: {
  media: Media[];
  subheading?: string;
}) {
  const [selectedMedia, setSelectedMedia] = useState<Photo | Design | null>();

  return (
    <>
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
                <Heading level={3}>{selectedMedia.title}</Heading>
                {selectedMedia.type === "photo" && (
                  <>
                    {selectedMedia.description && (
                      <p>{selectedMedia.description}</p>
                    )}
                    {selectedMedia.camera && <p>{selectedMedia.camera}</p>}
                  </>
                )}
              </ImageCaption>
              <Image
                src={`/portfolio/${selectedMedia.type}/${selectedMedia.id}`}
                alt={`${selectedMedia.title}`}
              />
            </ModalContent>
          </Modal>
        )}
      </Grid>
    </>
  );
}
