import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, getPool } from "@/lib/db";
import { isValidMediaId } from "@/lib/media";

export const runtime = "nodejs";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidMediaId(params.id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  await ensureSchema();
  await getPool().query(`DELETE FROM media WHERE id = $1`, [params.id]);
  return NextResponse.json({ ok: true });
}
