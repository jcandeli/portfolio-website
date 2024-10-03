import Audio from "@/components/Audio";
import Image from "@/components/Image";
import Video from "@/components/Video";
import { Media } from "@/types";
import { MouseEventHandler } from "react";

interface MediaCardProps {
  media: Media;
  onClick: MouseEventHandler | null;
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
            <h2>{media.title}</h2>
            {media.location && <h2>{media.location}</h2>}
            {media.camera && <p>{media.camera}</p>}
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
