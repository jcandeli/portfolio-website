"use client";

import Grid, { GridItem } from "@/components/Grid";
import MediaCard from "@/components/MediaCard";
import Modal from "@/components/Modal";
import { Media } from "@/types";
import Image from "next/image";
import { useState } from "react";

export default function MediaGrid({ media }: { media: Media }) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>();

  return (
    <Grid>
      {media.map((media: Media) => (
        <GridItem key={media.id} orientation={media.orientation}>
          <MediaCard media={media} onClick={() => setSelectedMedia(media)} />
        </GridItem>
      ))}

      {selectedMedia && (
        <Modal isOpen onClose={() => setSelectedMedia(null)}>
          <figure>
            <Image
              src={`/portfolio/${selectedMedia.type}/${selectedMedia.id}`}
              alt={selectedMedia.title}
              style={{ objectFit: "contain" }}
              fill
            />
            <figcaption>
              <h2>{selectedMedia.title}</h2>
              {location && <p>{selectedMedia.location}</p>}
              {selectedMedia.camera && <p>{selectedMedia.camera}</p>}
            </figcaption>
          </figure>
        </Modal>
      )}
    </Grid>
  );
}
