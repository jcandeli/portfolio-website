import Heading from "@/components/Heading";
import TitleOverlay from "@/components/TitleOverlay";
import { Design, Photo } from "@/types";
import styled from "@emotion/styled";

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
  const description = "description" in media ? media.description : undefined;
  const camera = "camera" in media ? media.camera : undefined;

  return (
    <ImageContainer>
      <Image src={`/portfolio/${type}/${id}`} alt={`${title}`} />
      <TitleOverlay>
        <Heading level={3}>{title}</Heading>
        {description && <p>{description}</p>}
        {camera && <p>{camera}</p>}
      </TitleOverlay>
    </ImageContainer>
  );
};

export default ImageElement;
