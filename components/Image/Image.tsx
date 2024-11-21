import TitleOverlay from "@/components/TitleOverlay";
import { Design, Photo } from "@/types";
import styled from "@emotion/styled";
import MediaDetails from "@/components/MediaDetails/MediaDetails";

const ImageContainer = styled.figure`
  position: relative;
  height: 100%;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

interface ImageElementProps {
  media: Photo | Design;
  showOverlay?: boolean;
}

const ImageElement = ({ media, showOverlay = true }: ImageElementProps) => {
  return (
    <ImageContainer>
      <Image
        src={`/portfolio/${media.type}/${media.id}`}
        alt={`${media.title}`}
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
