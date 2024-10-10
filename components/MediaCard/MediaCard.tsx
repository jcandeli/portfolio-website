import { MouseEventHandler } from "react";
import Audio from "@/components/Audio";
import Image from "@/components/Image";
import Video from "@/components/Video";
import { Media } from "@/types";

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
          <Image media={media} />
        </a>
      );
    case "music":
      return <Audio id={media.id} />;
    default:
      return <p>Invalid media type. {media.type}</p>;
  }
};

export default MediaCard;
