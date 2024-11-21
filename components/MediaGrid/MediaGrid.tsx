"use client";

import Grid, { GridItem } from "@/components/Grid";
import MediaCard from "@/components/MediaCard";
import Modal from "@/components/Modal";
import { Design, Media, Photo, Video } from "@/types";
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
  padding: 2rem;
`;

const Image = styled.img`
  object-fit: cover;
  max-width: min(90vw, 1200px);
  max-height: 70vh;
`;

const VideoFrame = styled.iframe`
  width: min(90vw, 1200px);
  height: min(70vh, calc(90vw * 9 / 16));
  max-width: 100%;
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
  const [selectedMedia, setSelectedMedia] = useState<
    Photo | Design | Video | null
  >();

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
              {media.type === "music" ? (
                <MediaCard media={media} />
              ) : (
                <button
                  onClick={() => setSelectedMedia(media)}
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
        </AnimatePresence>

        {selectedMedia && (
          <Modal
            isOpen
            onClose={() => setSelectedMedia(null)}
            aria-label={`${selectedMedia.title} details`}
            id="media-modal"
          >
            <ModalContent>
              {selectedMedia.type === "video" ? (
                <VideoFrame
                  title="YouTube Video Player"
                  src={`https://www.youtube.com/embed/${selectedMedia.id}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Image
                  src={`/portfolio/${selectedMedia.type}/${selectedMedia.id}`}
                  alt={`${selectedMedia.title}`}
                />
              )}
              <ImageCaption>
                <MediaDetails media={selectedMedia} />
              </ImageCaption>
            </ModalContent>
          </Modal>
        )}
      </Grid>
    </>
  );
}
