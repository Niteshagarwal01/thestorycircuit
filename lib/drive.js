export function extractDriveId(url) {
  if (!url) return null;
  // If it's a direct URL (Supabase, Cloudinary, etc.) — not a Drive link
  if (!url.includes('drive.google.com')) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  const match2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match2) return match2[1];
  return null;
}

// Returns a direct streamable video src
// Handles: Supabase URLs, Cloudinary URLs, direct .mp4 URLs, and Google Drive links
export function resolveVideoSrc(url) {
  if (!url) return null;
  // Direct URL (Supabase, Cloudinary, /public path, etc.)
  if (!url.includes('drive.google.com')) return url;
  // Google Drive
  const id = extractDriveId(url);
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : url;
}

// Returns a thumbnail/poster image URL
export function resolveThumbUrl(url) {
  if (!url) return null;
  // Direct image URL (Supabase, etc.)
  if (!url.includes('drive.google.com')) return url;
  // Google Drive — use uc?export=view (works cross-origin, no CORS block)
  const id = extractDriveId(url);
  return id ? `https://drive.google.com/uc?export=view&id=${id}` : url;
}

export function driveVideoEmbed(fileId) {
  if (!fileId) return null;
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function driveVideoSrc(fileId) {
  if (!fileId) return null;
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function driveImageUrl(fileId) {
  if (!fileId) return null;
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

export function driveThumbnail(fileId) {
  if (!fileId) return null;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
}
