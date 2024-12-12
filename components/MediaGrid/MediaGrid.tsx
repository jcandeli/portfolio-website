"use client";

import Grid, { GridItem } from "@/components/Grid";
import MediaCard from "@/components/MediaCard";
import Modal from "@/components/Modal";
import { Design, Media, Photo, Video } from "@/types";
import styled from "@emotion/styled";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import { createMediaDetailsUrl } from "@/utils/url";
import Heading from "../Heading";

const ModalContent = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    max-width: 90vw;
  }
`;

const ImageCaption = styled.figcaption`
  width: 100%;
  align-self: flex-start;
  padding: 2rem;
  position: relative;
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

const StyledHeading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StyledLastName = styled.span`
  line-height: 0.72;
  color: #2d2d2d;
  display: inline-block;
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

  const handleMediaClick = (media: Media) => {
    if (
      media.type === "photo" ||
      media.type === "design" ||
      media.type === "video"
    ) {
      setSelectedMedia(media);
    }
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
  };

  return (
    <>
      <Grid>
        <GridItem orientation="vertical">
          <StyledHeading>
            <Heading level={1} className="h1">
              JP
              <br />
              <StyledLastName>
                Can
                <br />
                de
                <br />
                lier
              </StyledLastName>
            </Heading>
            <Heading level={2} className="h2">
              Exploring Creativity Through Lens, Sound, and Design.
            </Heading>
          </StyledHeading>
        </GridItem>
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
        </AnimatePresence>

        {selectedMedia && (
          <Modal
            isOpen
            onClose={handleCloseModal}
            aria-label={`${selectedMedia.title} details`}
            id="media-modal"
            detailsUrl={createMediaDetailsUrl(
              selectedMedia.type,
              selectedMedia.title,
              selectedMedia.id
            )}
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
