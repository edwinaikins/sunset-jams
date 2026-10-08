import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, getPool } from "@/lib/db";

export const runtime = "nodejs";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body?.name || "").trim().slice(0, 120);
  const email = String(body?.email || "").trim().slice(0, 160);
  const phone = String(body?.phone || "").trim().slice(0, 40);
  const notes = String(body?.notes || "").trim().slice(0, 500);
  let guests = Number(body?.guests);
  if (!Number.isFinite(guests)) guests = 1;
  guests = Math.max(1, Math.min(20, Math.round(guests)));

  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Please enter a phone number we can reach you on." }, { status: 400 });
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  try {
    await ensureSchema();
    await getPool().query(
      `INSERT INTO rsvps (name, email, phone, guests, notes) VALUES ($1, $2, $3, $4, $5)`,
      [name, email || null, phone, guests, notes || null]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RSVP insert failed", err);
    return NextResponse.json({ error: "Could not save your RSVP. Please try again shortly." }, { status: 500 });
  }
}
