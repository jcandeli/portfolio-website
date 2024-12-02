/**
 * Creates a URL-friendly slug for media items
 * @param title The title of the media item
 * @param id The unique identifier
 * @returns Formatted slug string
 */
export function createMediaSlug(title: string, id: string) {
  return `${title.toLowerCase().replace(/\s+/g, "-")}.__id-${id}`;
}

/**
 * Creates the full details page URL for a media item
 * @param type The media type (photo, design, etc.)
 * @param title The title of the media item
 * @param id The unique identifier
 * @returns Full URL path
 */
export function createMediaDetailsUrl(type: string, title: string, id: string) {
  const slug = createMediaSlug(title, id);
  return `/details/${type}/${slug}`;
}

/**
 * Extracts the ID from a media slug
 * @param slug The URL slug (format: "title-goes-here.__id-123")
 * @returns The extracted ID
 */
export function extractIdFromSlug(slug: string) {
  const [, id] = slug.split(".__id-");
  return id;
}
