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
        <button onClick={onClick} className="h-full w-full">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image media={media} />
        </button>
      );
    case "music":
      return <Audio id={media.id} />;
    default:
      return <p>Invalid media type.</p>;
  }
};

export default MediaCard;
