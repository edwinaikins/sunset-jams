import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { ensureSchema, getPool } from "@/lib/db";
import { MAX_UPLOAD_BYTES, mediaUrl, sniffImageType } from "@/lib/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Protected by middleware (all /api/admin/* routes need a valid session).

export async function GET() {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, filename, mime, size, created_at FROM media ORDER BY created_at DESC LIMIT 200`
  );
  return NextResponse.json(
    rows.map((r: any) => ({
      id: r.id,
      filename: r.filename,
      mime: r.mime,
      size: r.size,
      url: mediaUrl(r.id),
      created_at: new Date(r.created_at).toISOString(),
    }))
  );
}

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Upload failed — the file may be too large (max 4 MB)." }, { status: 400 });
  }
  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "That image is over 4 MB. Please use a smaller one." }, { status: 413 });
  }
  const buf = Buffer.from(await file.arrayBuffer());
  const mime = sniffImageType(buf);
  if (!mime) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP or GIF images can be uploaded." }, { status: 415 });
  }

  const id = randomBytes(12).toString("hex");
  const filename = (String((file as File).name || "image").replace(/[^\w.\- ]+/g, "").trim() || "image").slice(0, 120);
  try {
    await ensureSchema();
    await getPool().query(`INSERT INTO media (id, filename, mime, size, data) VALUES ($1, $2, $3, $4, $5)`, [
      id,
      filename,
      mime,
      buf.length,
      buf,
    ]);
  } catch (err) {
    console.error("Media upload failed", err);
    return NextResponse.json({ error: "Could not save the image. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id, url: mediaUrl(id), filename, size: buf.length, mime });
}
