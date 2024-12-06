"use client";

import MediaCard from "@/components/MediaCard";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import styled from "@emotion/styled";
import { Design, Photo, Video } from "@/types";

interface DetailsPageProps {
  mediaItem: Photo | Design | Video;
}

const BackLink = styled.button`
  display: inline-block;
  margin-bottom: 1rem;
  color: var(--muted-foreground);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: var(--foreground);
  }
`;

const ContentWrapper = styled.div`
  max-width: min(95vw, 1200px);
  margin: 0 auto;
  width: 100%;
`;

const MediaCardWrapper = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  background-color: var(--background);
`;

const MediaDetailsWrapper = styled.div`
  width: 75%;
  padding: 2rem 0;
  margin-top: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem 0;
  }
`;

export function DetailsPage({ mediaItem }: DetailsPageProps) {
  return (
    <ContentWrapper>
      <BackLink onClick={() => window.history.back()}>← Back</BackLink>
      <MediaCardWrapper>
        <MediaCard media={mediaItem} showOverlay={false} />
      </MediaCardWrapper>
      <MediaDetailsWrapper>
        <MediaDetails media={mediaItem} />
      </MediaDetailsWrapper>
    </ContentWrapper>
  );
}
