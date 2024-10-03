"use client";

import { useState } from "react";
import Image from "next/image";
import Grid, { GridItem } from "@/components/Grid";
import MediaCard from "@/components/MediaCard";
import Modal from "@/components/Modal";
import { Media } from "@/types";

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
          <Image
            src={`http://jpcandelier.com/img/${selectedMedia.id}`}
            alt={selectedMedia.title}
            style={{ objectFit: "contain" }}
            fill
          />
        </Modal>
      )}
    </Grid>
  );
}
