import TitleOverlay from "@/components/TitleOverlay";
import { Design, Photo } from "@/types";
import styled from "@emotion/styled";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import { motion, useReducedMotion } from "framer-motion";

const ImageContainer = styled.figure`
  position: relative;
  height: 100%;
`;

const Image = styled(motion.img)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

interface ImageElementProps {
  media: Photo | Design;
  showOverlay?: boolean;
}

const ImageElement = ({ media, showOverlay = true }: ImageElementProps) => {
  const shouldReduceMotion = useReducedMotion();

  const animations = shouldReduceMotion
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

  return (
    <ImageContainer>
      <Image
        src={`/portfolio/${media.type}/${media.id}`}
        alt={`${media.title}`}
        {...animations}
        viewport={{ once: true }}
      />
      {showOverlay && (
        <TitleOverlay>
          <MediaDetails media={media} />
        </TitleOverlay>
      )}
    </ImageContainer>
  );
};

export default ImageElement;
