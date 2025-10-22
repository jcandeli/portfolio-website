"use client";

import styled from "@emotion/styled";
import { GradientBlob } from "@/components/GradientBlob";
import mediaData from "@/data/media.json";

const Container = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  justify-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BlobWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-size: 0.875rem;
  color: #888;
  text-align: center;
`;

// Filter media items that have colors (photos and designs)
const mediaWithColors = mediaData.filter(
  (
    item
  ): item is typeof item & { colors: string[]; colorProportions?: number[] } =>
    "colors" in item && Array.isArray(item.colors) && item.colors.length > 0
);

export default function GradientsPage() {
  return (
    <Container>
      <Title>Gradient Experiments</Title>

      <Grid>
        {mediaWithColors.map((item) => (
          <BlobWrapper key={item.id}>
            <GradientBlob
              colors={item.colors}
              colorProportions={item.colorProportions}
            />
            <Label>{item.title}</Label>
          </BlobWrapper>
        ))}
      </Grid>
    </Container>
  );
}
