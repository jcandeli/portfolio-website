"use client";

import { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Image from "next/image";

interface MediaItem {
  type: string;
  id: string;
  title?: string;
  camera?: string;
  location?: string;
  orientation?: string;
}

interface MediaGridProps {
  media: MediaItem[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled(motion.div)<{ orientation?: string }>`
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;

  ${({ orientation }) =>
    orientation === "horizontal"
      ? "grid-column: span 2;"
      : orientation === "vertical"
      ? "grid-row: span 2;"
      : ""}

  @media (max-width: 768px) {
    grid-column: span 1;
    grid-row: span 1;
  }
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const MediaContent = styled.div<{ type: string }>`
  width: 100%;
  height: 100%;
  ${({ type, id }) =>
    type === "photo"
      ? css`
          background-image: url(/images/${id});
          background-size: cover;
          background-position: center;
        `
      : type === "video"
      ? css`
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `
      : type === "soundcloud"
      ? css`
          iframe {
            width: 100%;
            height: 100%;
          }
        `
      : ""}
`;

export function MediaGrid({ media }: MediaGridProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <Grid>
      {media.map((item, index) => (
        <GridItem
          key={item.id}
          orientation={item.orientation}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          onHoverStart={() => setHoveredItem(item.id)}
          onHoverEnd={() => setHoveredItem(null)}
          onFocus={() => setHoveredItem(item.id)}
          onBlur={() => setHoveredItem(null)}
        >
          <MediaContent type={item.type}>
            {item.type === "photo" && (
              <Image
                src={`/portfolio/photos/${item.id}`}
                alt={item.title}
                width={500}
                height={300}
                layout="responsive"
              />
            )}
            {item.type === "video" && (
              <video src={`/videos/${item.id}`} loop muted playsInline />
            )}
            {item.type === "soundcloud" && (
              <iframe
                src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${item.id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
              />
            )}
          </MediaContent>
          <Overlay
            initial={false}
            animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
          >
            {item.title && <h2>{item.title}</h2>}
            {item.camera && <p>{item.camera}</p>}
            {item.location && <p>{item.location}</p>}
          </Overlay>
        </GridItem>
      ))}
    </Grid>
  );
}
