// TMDB image utilities
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const buildImageUrl = (
  path: string | null,
  size: string = "w500"
): string => {
  if (!path) return "/placeholder.svg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Helper to get poster URL in appropriate size
export const getPosterUrl = (
  path: string | null,
  size: string = "w500"
): string => {
  return buildImageUrl(path, size);
};
