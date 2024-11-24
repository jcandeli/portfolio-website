import TitleOverlay from "@/components/TitleOverlay";
import { Design, Photo } from "@/types";
import styled from "@emotion/styled";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import NextImage from "next/image";

const ImageContainer = styled.figure`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Image = styled(NextImage)`
  object-fit: cover;
`;

const ImageElement = ({ media }: { media: Photo | Design }) => {
  return (
    <ImageContainer>
      <Image
        src={`/portfolio/${media.type}/${media.id}`}
        alt={`${media.title}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />
      <TitleOverlay>
        <MediaDetails media={media} />
      </TitleOverlay>
    </ImageContainer>
  );
};

export default ImageElement;
