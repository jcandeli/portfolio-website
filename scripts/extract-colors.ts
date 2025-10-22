import * as fs from "fs";
import * as path from "path";
import { Vibrant } from "node-vibrant/node";

interface MediaItem {
  type: string;
  id: string;
  title: string;
  colors?: string[];
  colorProportions?: number[];
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

      // Calculate a visual impact score: population * saturation
      // This balances "how much of the image" with "how visually striking"
      const swatchesWithScore = allSwatches.map((swatch) => {
        const [h, s, l] = swatch!.hsl;
        return {
          swatch,
          // Saturation is 0-1, boost vibrant colors: pop * sqrt(saturation)
          score: swatch!.population * Math.sqrt(s),
        };
      });

      // Sort by visual impact score
      const sortedSwatches = swatchesWithScore
        .sort((a, b) => b.score - a.score)
        .map((item) => item.swatch);

      // Start with highest visual impact as background
      const backgroundColor = sortedSwatches[0];

      // Force include the MOST saturated colors, even if tiny
      // Sort all swatches by pure saturation to find the most vivid
      const bySaturation = [...allSwatches].sort((a, b) => {
        const [h1, s1] = a!.hsl;
        const [h2, s2] = b!.hsl;
        return s2 - s1;
      });

      // Combine: highest visual impact + most saturated colors
      const selectedSwatches = [
        backgroundColor, // Most visually impactful
        ...bySaturation.filter((s) => s !== backgroundColor).slice(0, 3), // 3 most saturated
      ].slice(0, 4);

      // Extract 4 colors
      const colors = selectedSwatches.map((swatch) => swatch!.hex);

      // Calculate total population
      const totalPopulation = selectedSwatches.reduce(
        (sum, swatch) => sum + swatch!.population,
        0
      );

      // Calculate visual proportions with dramatic saturation boost
      // Highly saturated colors get artificially larger proportions for visual impact
      const visualWeights = selectedSwatches.map((swatch) => {
        const [h, s, l] = swatch!.hsl;
        const actualProportion = swatch!.population / totalPopulation;
        // Dramatic boost for saturated colors: weight = actualProp * (1 + saturation^0.5 * 5)
        // A 1% red with 90% saturation: 1% * (1 + 0.95 * 5) = ~5.7%
        // A 50% tan with 20% saturation: 50% * (1 + 0.45 * 5) = ~162%
        // After normalization, vibrant colors punch way above their pixel weight
        return actualProportion * (1 + Math.sqrt(s) * 5);
      });

      // Normalize visual weights to sum to 1
      const totalVisualWeight = visualWeights.reduce((sum, w) => sum + w, 0);
      const colorProportions = visualWeights.map((w) => w / totalVisualWeight);

      // Ensure we have at least 3 colors by duplicating if needed
      while (colors.length < 3 && colors.length > 0) {
        colors.push(colors[colors.length - 1]);
        colorProportions.push(colorProportions[colorProportions.length - 1]);
      }

      // Add colors and proportions to item
      item.colors = colors;
      item.colorProportions = colorProportions;

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
