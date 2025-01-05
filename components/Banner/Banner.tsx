"use client";

import Grid, { GridItem } from "@/components/Grid";
import Heading from "@/components/Heading";
import styled from "@emotion/styled";
import MediaCard from "../MediaCard";
import { Photo } from "@/types";
import { motion } from "framer-motion";
import { useGlobal } from "@/contexts/GlobalContext";

const media = {
  type: "photo",
  id: "3299396187_97ccd37f7b_b.jpg",
  title: "Multiple Exposure",
  description: "Mae Hong Son, Thailand",
  camera: "Diana Camera",
  orientation: "block",
};

const StyledHeading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

const StyledLastName = styled.span`
  line-height: 0.78;
  display: inline-block;
`;

const StyledSpan = styled.span`
  display: block;
  letter-spacing: -0.4rem;
  @media (max-width: 768px) {
    letter-spacing: -0.3rem;
  }
`;

const StyledSpan2 = styled.span`
  display: block;
  letter-spacing: -0.7rem;
  @media (max-width: 768px) {
    letter-spacing: -0.6rem;
  }
`;

export default function Banner() {
  const { setSelectedMedia } = useGlobal();

  const handleMediaClick = (media: Photo) => {
    if (
      media.type === "photo" ||
      media.type === "design" ||
      media.type === "video"
    ) {
      setSelectedMedia(media);
    }
  };

  return (
    <Grid>
      <GridItem orientation="vertical" disableBorderRadius>
        <StyledHeading>
          <Heading level={1} className="h1">
            <span className="visually-hidden">JP Candelier</span>
            <span aria-hidden="true">
              <StyledSpan>JP</StyledSpan>
              <StyledLastName>
                <StyledSpan>Can</StyledSpan>
                <StyledSpan>de</StyledSpan>
                <StyledSpan2>lier</StyledSpan2>
              </StyledLastName>
            </span>
          </Heading>
          <Heading level={2} className="h2">
            Exploring Creativity Through Lens, Sound, and Design.
          </Heading>
        </StyledHeading>
      </GridItem>
      <GridItem as={motion.div} key={media.id} orientation={media.orientation}>
        <button
          onClick={() => handleMediaClick(media as Photo)}
          className="h-full w-full"
          aria-haspopup="dialog"
          aria-label={`View ${media.title}`}
          aria-controls="media-modal"
        >
          <MediaCard media={media as Photo} />
        </button>
      </GridItem>
    </Grid>
  );
}
