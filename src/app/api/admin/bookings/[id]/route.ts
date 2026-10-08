import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, getPool } from "@/lib/db";

export const runtime = "nodejs";

const VALID_STATUS = new Set(["pending", "approved", "declined"]);

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!VALID_STATUS.has(body?.status)) {
    return NextResponse.json({ error: "status must be pending, approved, or declined." }, { status: 400 });
  }

  await ensureSchema();
  await getPool().query(`UPDATE bookings SET status = $1 WHERE id = $2`, [body.status, id]);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  await ensureSchema();
  await getPool().query(`DELETE FROM bookings WHERE id = $1`, [id]);
  return NextResponse.json({ ok: true });
}
