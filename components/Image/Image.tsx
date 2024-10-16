import styled from "@emotion/styled";
import TitleOverlay from "@/components/TitleOverlay";
import { Design, Photo } from "@/types";

const ImageContainer = styled.figure`
  position: relative;
  height: 100%;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageElement = ({ media }: { media: Photo | Design }) => {
  const { id, type, title } = media;
  const location = "location" in media ? media.location : undefined;
  const camera = "camera" in media ? media.camera : undefined;

  return (
    <ImageContainer>
      <Image src={`/portfolio/${type}/${id}`} alt={`${title}`} />
      <TitleOverlay>
        <h3>{title}</h3>
        {location && <p>{location}</p>}
        {camera && <p>{camera}</p>}
      </TitleOverlay>
    </ImageContainer>
  );
};

export default ImageElement;
