import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, getPool } from "@/lib/db";

export const runtime = "nodejs";

const VALID_TYPES = new Set(["vip_table", "vendor", "sponsor"]);

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
  const message = String(body?.message || "").trim().slice(0, 800);
  let bookingType = String(body?.booking_type || "vip_table");
  if (!VALID_TYPES.has(bookingType)) bookingType = "vip_table";
  let partySize = Number(body?.party_size);
  if (!Number.isFinite(partySize)) partySize = 1;
  partySize = Math.max(1, Math.min(50, Math.round(partySize)));

  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Please enter a phone number we can reach you on." }, { status: 400 });
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  try {
    await ensureSchema();
    await getPool().query(
      `INSERT INTO bookings (name, email, phone, party_size, booking_type, message, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')`,
      [name, email || null, phone, partySize, bookingType, message || null]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Booking insert failed", err);
    return NextResponse.json({ error: "Could not save your request. Please try again shortly." }, { status: 500 });
  }
}
