import styled from "@emotion/styled";
import TitleOverlay from "@/components/TitleOverlay";
import Image from "next/image";
import { Media } from "@/types";

const Title = styled.h2`
  font-family: "Geist", sans-serif;
  font-weight: 500;
`;

const Description = styled.p`
  font-family: "Geist", sans-serif;
  font-weight: 300;
`;

const ImageContainer = styled.figure`
  align-items: center;
  background-color: #dadada;
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const ImageElement = ({ media }: { media: Media }) => {
  const { id, type, title, location, camera } = media;
  return (
    <ImageContainer>
      <Image
        src={`/portfolio/${type}/${id}`}
        alt={`${title}`}
        layout="fill"
        objectFit="cover"
      />
      <TitleOverlay>
        <Title>{title}</Title>
        {location && <Description>{location}</Description>}
        {camera && <Description>{camera}</Description>}
      </TitleOverlay>
    </ImageContainer>
  );
};

export default ImageElement;
