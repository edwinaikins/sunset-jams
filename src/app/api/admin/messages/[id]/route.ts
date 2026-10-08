import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, getPool } from "@/lib/db";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body?.is_read !== "boolean") {
    return NextResponse.json({ error: "is_read must be a boolean." }, { status: 400 });
  }

  await ensureSchema();
  await getPool().query(`UPDATE messages SET is_read = $1 WHERE id = $2`, [body.is_read, id]);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  await ensureSchema();
  await getPool().query(`DELETE FROM messages WHERE id = $1`, [id]);
  return NextResponse.json({ ok: true });
}
