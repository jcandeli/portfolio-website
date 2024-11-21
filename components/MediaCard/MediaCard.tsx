import Audio from "@/components/Audio";
import Image from "@/components/Image";
import Video from "@/components/Video";
import { Media } from "@/types";

interface MediaCardProps {
  media: Media;
  showOverlay?: boolean;
}

const MediaCard = ({ media, showOverlay = true }: MediaCardProps) => {
  switch (media.type) {
    case "video":
      return <Video media={media} />;
    case "photo":
    case "design":
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image media={media} showOverlay={showOverlay} />;
    case "music":
      return <Audio id={media.id} />;
    default:
      return <p>Invalid media type.</p>;
  }
};

export default MediaCard;
