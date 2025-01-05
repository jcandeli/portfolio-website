"use client";

import Grid, { GridItem } from "@/components/Grid";
import MediaCard from "@/components/MediaCard";
import { Media, Photo } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobal } from "@/contexts/GlobalContext";

const item = {
  hidden: {
    y: 40,
    // filter: "blur(32px)",
  },
  show: {
    y: 0,
    // filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      staggerChildren: 0.25,
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
        <AnimatePresence>
          {media.map((media: Media) => (
            <GridItem
              as={motion.div}
              key={media.id}
              variants={item}
              initial="hidden"
              animate="show"
              exit="hidden"
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
        </AnimatePresence>
      </Grid>
    </>
  );
}
