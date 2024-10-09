import { useState } from "react";
import styled from "@emotion/styled";
import TitleOverlay from "@/components/TitleOverlay";

interface VideoProps {
  id: string;
  title: string | undefined;
}

const VideoIcon = styled.img`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
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
  const [showPlayer, setShowPlayer] = useState(false);

  const handleClick = () => {
    setShowPlayer(true);
  };

  return (
    <>
      {!showPlayer && (
        <ImageContainer>
          <ImageElement
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt="Video Thumbnail"
          />
          <TitleOverlay onClick={handleClick}>{title}</TitleOverlay>
          <VideoIcon
            onClick={handleClick}
            src="video-icon.svg"
            alt="Play Video"
          />
        </ImageContainer>
      )}
      {showPlayer && (
        <iframe
          title="YouTube Video Player"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </>
  );
};

export default Video;
