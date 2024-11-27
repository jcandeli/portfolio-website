import styled from "@emotion/styled";
import TitleOverlay from "@/components/TitleOverlay";
import Heading from "../Heading";

interface VideoProps {
  id: string;
  title: string | undefined;
}

const VideoIcon = styled.img`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  opacity: 60%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const ImageElement = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Video = ({ id, title }: VideoProps) => {
  return (
    <ImageContainer>
      <ImageElement
        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt="Video Thumbnail"
      />
      <TitleOverlay>
        <Heading level={3}>{title}</Heading>
      </TitleOverlay>
      <VideoIcon src="video-icon.svg" alt="Play Video" />
    </ImageContainer>
  );
};

export default Video;
