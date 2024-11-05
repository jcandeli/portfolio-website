import Heading from "@/components/Heading";
import { Design, Photo } from "@/types";
import { Camera } from "lucide-react";

interface MediaDetailsProps {
  media: Photo | Design;
}

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
          <Camera
            size={20}
            style={{
              display: "inline-block",
              marginInline: "0.25rem 0",
              marginBlock: "-5px 0",
            }}
            aria-hidden="true"
          />
          <span className="sr-only">Camera used:</span> {camera}
        </p>
      )}
    </>
  );
}
