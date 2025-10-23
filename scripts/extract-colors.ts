import * as fs from "fs";
import * as path from "path";
import { Vibrant } from "node-vibrant/node";

interface MediaItem {
  type: string;
  id: string;
  title: string;
  colors?: string[];
  [key: string]: unknown;
}

async function extractColors() {
  console.log("🎨 Starting color extraction...\n");

  const mediaJsonPath = path.join(process.cwd(), "data", "media.json");
  const publicPath = path.join(process.cwd(), "public", "portfolio");

  // Read media.json
  const mediaData: MediaItem[] = JSON.parse(
    fs.readFileSync(mediaJsonPath, "utf-8")
  );

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  // Process each item
  for (const item of mediaData) {
    // Skip music and video items (no local images)
    if (item.type === "music" || item.type === "video") {
      skipped++;
      continue;
    }

    // Build image path
    const imagePath = path.join(publicPath, item.type, item.id);

    // Check if image exists
    if (!fs.existsSync(imagePath)) {
      console.warn(`⚠️  Image not found: ${item.type}/${item.id}`);
      errors++;
      continue;
    }

    try {
      // Extract color palette
      const vibrant = new Vibrant(imagePath);
      const palette = await vibrant.getPalette();

      // Get all available swatches
      const allSwatches = [
        palette.Vibrant,
        palette.DarkVibrant,
        palette.LightVibrant,
        palette.Muted,
        palette.DarkMuted,
        palette.LightMuted,
      ].filter((s) => s !== null && s !== undefined);

      // Sort by pure dominance (pixel count)
      // This gives the most accurate representation of actual color distribution
      const sortedByDominance = [...allSwatches].sort(
        (a, b) => b!.population - a!.population
      );

      // Pick top 4 most dominant colors
      const selectedSwatches = sortedByDominance.slice(0, 4);

      // Extract 4 colors
      const colors = selectedSwatches.map((swatch) => swatch!.hex);

      // Ensure we have at least 3 colors by duplicating if needed
      while (colors.length < 3 && colors.length > 0) {
        colors.push(colors[colors.length - 1]);
      }

      // Add colors to item and remove old colorProportions if exists
      item.colors = colors;
      delete item.colorProportions;

      processed++;
      console.log(`✅ ${processed}. ${item.title} - ${colors.length} colors`);
    } catch (error) {
      console.error(`❌ Error processing ${item.type}/${item.id}:`, error);
      errors++;
    }
  }

  // Write updated data back to media.json
  fs.writeFileSync(mediaJsonPath, JSON.stringify(mediaData, null, 2));

  console.log("\n✨ Color extraction complete!");
  console.log(`   Processed: ${processed}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
}

extractColors().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
