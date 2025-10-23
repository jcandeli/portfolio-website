"use client";

import styled from "@emotion/styled";

interface GradientBlobProps {
  colors: string[];
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
  size = 300,
}: GradientBlobProps) {
  // First color is the background, rest are overlays
  const backgroundColor = colors[0];
  const overlayColors = colors.slice(1);

  // Fixed proportions: 50%, 25%, 15%, 10%
  // Background (color 1) is 50%, so overlays get 25%, 15%, 10%
  const fixedProportions = [0.25, 0.15, 0.1];

  const positions = getGradientPositions(overlayColors, fixedProportions);

  const gradients = overlayColors
    .map((color, i) => {
      const pos = positions[i];
      // Ultra-smooth gradient with 7 stops for maximum smoothness
      // Tiny solid core with very gradual fade throughout
      const stop1 = pos.size * 0.15; // Tiny solid core (15%)
      const stop2 = pos.size * 0.35; // 95% opacity
      const stop3 = pos.size * 0.5; // 80% opacity
      const stop4 = pos.size * 0.65; // 60% opacity
      const stop5 = pos.size * 0.75; // 40% opacity
      const stop6 = pos.size * 0.85; // 20% opacity
      return `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${color} 0%, ${color} ${stop1}%, ${color}F2 ${stop2}%, ${color}CC ${stop3}%, ${color}99 ${stop4}%, ${color}66 ${stop5}%, ${color}33 ${stop6}%, transparent ${pos.size}%)`;
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
