"use client";

import TitleOverlay from "@/components/TitleOverlay";
import { Design, Photo } from "@/types";
import styled from "@emotion/styled";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import { motion, useReducedMotion } from "framer-motion";
import { GradientBlob } from "@/components/GradientBlob";
import { useState } from "react";

const ImageContainer = styled.figure`
  position: relative;
  height: 100%;
`;

const GradientWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Image = styled(motion.img)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
`;

interface ImageElementProps {
  media: Photo | Design;
  showOverlay?: boolean;
}

const ImageElement = ({ media, showOverlay = true }: ImageElementProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasColors = media.colors && media.colors.length > 0;

  const handleMouseEnter = () => {
    setIsRevealed(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Animation for images without colors (normal behavior)
  const normalAnimations = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.3 },
      }
    : {
        initial: { opacity: 0, y: 20, scale: 0.9 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.5, ease: "easeOut" },
      };

  // Animation for images with colors (gradient placeholder)
  const gradientAnimations = {
    initial: { opacity: 0 },
    animate: { opacity: isRevealed ? 1 : 0 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  const animations = hasColors ? gradientAnimations : normalAnimations;

  // Show overlay on hover, but only after image has been revealed
  const shouldShowOverlay =
    showOverlay && isHovered && (hasColors ? isRevealed : true);

  return (
    <ImageContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hasColors && (
        <GradientWrapper>
          <GradientBlob colors={media.colors!} />
        </GradientWrapper>
      )}
      <Image
        src={`/portfolio/${media.type}/${media.id}`}
        alt={`${media.title}`}
        {...animations}
        viewport={hasColors ? undefined : { once: true }}
      />
      {shouldShowOverlay && (
        <TitleOverlay>
          <MediaDetails media={media} />
        </TitleOverlay>
      )}
    </ImageContainer>
  );
};

export default ImageElement;
