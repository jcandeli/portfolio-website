import Heading from "@/components/Heading";
import { Design, Photo, Video } from "@/types";
import { Camera } from "lucide-react";
import styled from "@emotion/styled";

interface MediaDetailsProps {
  media: Photo | Design | Video;
}

const StyledCamera = styled(Camera)`
  display: inline-block;
  margin-inline: 0.25rem 0;
  margin-block: -5px 0;
`;

export default function MediaDetails({ media }: MediaDetailsProps) {
  const { title } = media;
  const description = "description" in media ? media.description : undefined;
  const camera = "camera" in media ? media.camera : undefined;

  return (
    <>
      <Heading level={3}>{title}</Heading>
      {description && <p>{description}</p>}
      {camera && (
        <p>
          <StyledCamera size={20} aria-hidden="true" />
          <span className="sr-only">Camera used:</span> {camera}
        </p>
      )}
    </>
  );
}
