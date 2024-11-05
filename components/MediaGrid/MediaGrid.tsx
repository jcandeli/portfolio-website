"use client";

import Grid, { GridItem } from "@/components/Grid";
import Heading from "@/components/Heading";
import MediaCard from "@/components/MediaCard";
import Modal from "@/components/Modal";
import { Design, Media, Photo } from "@/types";
import styled from "@emotion/styled";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5,
    },
  },
};

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
      <Grid
        as={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
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
                {"description" in selectedMedia && (
                  <p>{selectedMedia.description}</p>
                )}
                {"camera" in selectedMedia && <p>{selectedMedia.camera}</p>}
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
