"use client";

import Grid, { GridItem } from "@/components/Grid";
import MediaCard from "@/components/MediaCard";
import Modal from "@/components/Modal";
import { Design, Media, Photo } from "@/types";
import styled from "@emotion/styled";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MediaDetails from "@/components/MediaDetails/MediaDetails";

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

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

export default function MediaGrid({ media }: { media: Media[] }) {
  const [selectedMedia, setSelectedMedia] = useState<Photo | Design | null>();

  return (
    <>
      <Grid>
        <AnimatePresence>
          {media.map((media: Media) => (
            <GridItem
              as={motion.div}
              key={media.id}
              variants={item}
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
        </AnimatePresence>
      </Grid>

      {selectedMedia && (
        <Modal
          isOpen
          onClose={() => setSelectedMedia(null)}
          aria-label={`${selectedMedia.title} details`}
          id="media-modal"
        >
          <ModalContent>
            <ImageCaption>
              <MediaDetails media={selectedMedia} />
            </ImageCaption>
            <Image
              src={`/portfolio/${selectedMedia.type}/${selectedMedia.id}`}
              alt={`${selectedMedia.title}`}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
