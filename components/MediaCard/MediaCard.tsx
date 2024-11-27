import Audio from "@/components/Audio";
import Image from "@/components/Image";
import Video from "@/components/Video";
import { Media } from "@/types";

interface MediaCardProps {
  media: Media;
}

const MediaCard = ({ media }: MediaCardProps) => {
  switch (media.type) {
    case "video":
      return <Video media={media} />;
    case "photo":
    case "design":
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image media={media} />;
    case "music":
      return <Audio id={media.id} />;
    default:
      return <p>Invalid media type.</p>;
  }
};

export default MediaCard;
