// Image storage in Postgres. Uploads are sniffed by their first bytes so only
// real JPEG / PNG / WebP / GIF files are accepted (no SVG, which can carry script).

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // stays under Vercel's 4.5 MB request limit

export function sniffImageType(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  const head = buf.subarray(0, 6).toString("ascii");
  if (head === "GIF87a" || head === "GIF89a") return "image/gif";
  return null;
}

export function mediaUrl(id: string) {
  return `/media/${id}`;
}

export function isValidMediaId(id: string) {
  return /^[a-f0-9]{24}$/.test(id);
}
