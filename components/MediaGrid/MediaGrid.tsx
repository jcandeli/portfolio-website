"use client";

import Grid, { GridItem } from "@/components/Grid";
import MediaCard from "@/components/MediaCard";
import { Media, Photo } from "@/types";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "../Heading";
import { useGlobal } from "@/contexts/GlobalContext";

const StyledHeading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StyledLastName = styled.span`
  line-height: 0.72;
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
  const { setSelectedMedia } = useGlobal();

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
      </Grid>
    </>
  );
}
