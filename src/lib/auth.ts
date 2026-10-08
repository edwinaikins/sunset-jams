// Lightweight signed-cookie session, built on Web Crypto so it works
// identically in Next.js middleware (edge runtime) and API routes (node runtime).

export const SESSION_COOKIE = "sj_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function base64url(bytes: Uint8Array): string {
  let str = btoa(String.fromCharCode(...bytes));
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const bin = atob(str);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(secret: string): Promise<string> {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_SECONDS * 1000 });
  const payloadB64 = base64url(new TextEncoder().encode(payload));
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
  const sigB64 = base64url(new Uint8Array(sig));
  return `${payloadB64}.${sigB64}`;
}

export async function verifySessionToken(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sigB64] = parts;
  try {
    const key = await hmacKey(secret);
    const sig = base64urlDecode(sigB64);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sig,
      new TextEncoder().encode(payloadB64)
    );
    if (!valid) return false;
    const payload = JSON.parse(new TextDecoder().decode(base64urlDecode(payloadB64)));
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}
