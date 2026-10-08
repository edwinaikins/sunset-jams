import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, getPool } from "@/lib/db";

export const runtime = "nodejs";

function toCsv(rows: Record<string, any>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const esc = (v: any) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => esc(row[h])).join(","));
  }
  return lines.join("\n");
}

const TABLES: Record<string, string> = {
  rsvps: "SELECT id, name, email, phone, guests, notes, checked_in, created_at FROM rsvps ORDER BY created_at DESC",
  bookings:
    "SELECT id, name, email, phone, party_size, booking_type, status, message, created_at FROM bookings ORDER BY created_at DESC",
  messages: "SELECT id, name, email, subject, message, is_read, created_at FROM messages ORDER BY created_at DESC",
};

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") || "rsvps";
  const sql = TABLES[type];
  if (!sql) return NextResponse.json({ error: "Unknown export type." }, { status: 400 });

  await ensureSchema();
  const { rows } = await getPool().query(sql);
  const csv = toCsv(rows);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="sunset-jams-${type}.csv"`,
    },
  });
}
