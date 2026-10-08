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
  const subject = String(body?.subject || "").trim().slice(0, 160);
  const message = String(body?.message || "").trim().slice(0, 2000);

  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!message) return NextResponse.json({ error: "Please write a message." }, { status: 400 });

  try {
    await ensureSchema();
    await getPool().query(
      `INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4)`,
      [name, email, subject || null, message]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact insert failed", err);
    return NextResponse.json({ error: "Could not send your message. Please try again shortly." }, { status: 500 });
  }
}
