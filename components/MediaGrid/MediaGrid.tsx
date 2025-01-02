"use client";

import Grid, { GridItem } from "@/components/Grid";
import MediaCard from "@/components/MediaCard";
import { Media, Photo } from "@/types";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useGlobal } from "@/contexts/GlobalContext";

const item = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateY: -45,
    transformPerspective: 1000,
    transformOrigin: "right",
  },
  show: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 120,
      opacity: { duration: 0.15 },
    },
  },
};

const reducedItem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export default function MediaGrid({ media }: { media: Media[] }) {
  const { setSelectedMedia } = useGlobal();
  const prefersReducedMotion = useReducedMotion();

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
        <AnimatePresence>
          {media.map((media: Media, index: number) => (
            <GridItem
              as={motion.div}
              key={media.id}
              variants={prefersReducedMotion ? reducedItem : item}
              orientation={
                media.type === "photo" ||
                media.type === "design" ||
                media.type === "video"
                  ? (media as Photo).orientation
                  : undefined
              }
              transition={{
                delay: prefersReducedMotion ? 0 : index * 0.05,
              }}
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
