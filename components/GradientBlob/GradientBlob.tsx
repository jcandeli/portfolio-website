"use client";

import styled from "@emotion/styled";

interface GradientBlobProps {
  colors: string[];
  colorProportions?: number[];
  size?: number;
}

// Simple hash function to generate deterministic values from colors
function hashColors(colors: string[]): number {
  const str = colors.join("");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Generate deterministic positions for gradients
// Strategically place gradients to start from different areas
function getGradientPositions(colors: string[], proportions?: number[]) {
  const hash = hashColors(colors);
  const positions = [];

  // Define starting regions: corners and edges for better distribution
  const regions = [
    { x: 0, y: 0 }, // Top-left
    { x: 100, y: 0 }, // Top-right
    { x: 0, y: 100 }, // Bottom-left
    { x: 100, y: 100 }, // Bottom-right
    { x: 50, y: 0 }, // Top-center
    { x: 50, y: 100 }, // Bottom-center
    { x: 0, y: 50 }, // Left-center
    { x: 100, y: 50 }, // Right-center
  ];

  for (let i = 0; i < colors.length; i++) {
    const seed = hash + i * 1000;
    // Pick a region based on index, with some deterministic variation
    const regionIndex = (i + (hash % 4)) % regions.length;
    const baseRegion = regions[regionIndex];

    // Add some variation around the base region (±20%)
    const xVariation = (seed % 40) - 20;
    const yVariation = ((seed * 7) % 40) - 20;

    const x = Math.max(0, Math.min(100, baseRegion.x + xVariation));
    const y = Math.max(0, Math.min(100, baseRegion.y + yVariation));

    // If proportions are provided, use them to scale gradient size dramatically
    // Map proportion directly to gradient size for accurate representation
    let size;
    if (proportions && proportions[i] !== undefined) {
      // Map proportion (0-1) to size range (30-120%)
      // Scale more dramatically: small colors = small gradients, large colors = large gradients
      size = Math.round(proportions[i] * 150 + 30);
    } else {
      size = ((seed * 13) % 40) + 60;
    }

    positions.push({ x, y, size });
  }

  return positions;
}

const BlobContainer = styled.div<{
  $gradients: string;
  $backgroundColor: string;
  $size: number;
}>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  background-color: ${(props) => props.$backgroundColor};
  background-image: ${(props) => props.$gradients};
  background-blend-mode: normal;
`;

export default function GradientBlob({
  colors,
  colorProportions,
  size = 300,
}: GradientBlobProps) {
  // First color is the background, rest are overlays
  const backgroundColor = colors[0];
  const overlayColors = colors.slice(1);
  const overlayProportions = colorProportions?.slice(1);

  const positions = getGradientPositions(overlayColors, overlayProportions);

  const gradients = overlayColors
    .map((color, i) => {
      const pos = positions[i];
      // Keep most of the circle solid, only fade at the edges (last 20%)
      const fadeStart = Math.max(0, pos.size - 25);
      return `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${color} 0%, ${color} ${fadeStart}%, transparent ${pos.size}%)`;
    })
    .join(", ");

  return (
    <BlobContainer
      $gradients={gradients}
      $backgroundColor={backgroundColor}
      $size={size}
    />
  );
}
