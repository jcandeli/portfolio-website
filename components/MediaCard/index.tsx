import { MouseEventHandler } from "react";
import Audio from "@/components/Audio";
import Image from "@/components/Image";
import Video from "@/components/Video";
import styled from "@emotion/styled";
import { Media } from "@/types";

const CardTitle = styled.h2`
  font-family: "Geist", sans-serif;
  font-weight: 500;
`;

const CardDescription = styled.p`
  font-family: "Geist", sans-serif;
  font-weight: 300;
`;

interface MediaCardProps {
  media: Media;
  onClick: MouseEventHandler;
}

const MediaCard = ({ media, onClick = () => {} }: MediaCardProps) => {
  switch (media.type) {
    case "video":
      return <Video id={media.id} title={media.title} />;
    case "photo":
    case "design":
      return (
        <a onClick={onClick}>
          <Image id={media.id} alt={media.title}>
            <CardTitle>{media.title}</CardTitle>
            {media.location && (
              <CardDescription>{media.location}</CardDescription>
            )}
            {media.camera && <CardDescription>{media.camera}</CardDescription>}
          </Image>
        </a>
      );
    case "music":
      return <Audio id={media.id} />;
    default:
      return <p>Invalid media type. {media.type}</p>;
  }
};

export default MediaCard;
