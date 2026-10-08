import { NextRequest } from "next/server";
import { ensureSchema, getPool } from "@/lib/db";
import { isValidMediaId } from "@/lib/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public image delivery. Each upload gets a new random id, so the bytes behind
// a URL never change and can be cached by browsers and Vercel's CDN for a year.
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidMediaId(params.id)) return new Response("Not found", { status: 404 });
  try {
    await ensureSchema();
    const { rows } = await getPool().query(`SELECT mime, data FROM media WHERE id = $1`, [params.id]);
    if (rows.length === 0) return new Response("Not found", { status: 404 });
    const data: Buffer = rows[0].data;
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": rows[0].mime,
        "Content-Length": String(data.length),
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'",
      },
    });
  } catch (err) {
    console.error("Media fetch failed", err);
    return new Response("Error", { status: 500 });
  }
}
