import { NextRequest, NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Protected by middleware (all /api/admin/* routes need a valid session).
export async function GET() {
  return NextResponse.json(await getSiteContent());
}

export async function PUT(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  try {
    const saved = await saveSiteContent(body);
    return NextResponse.json({ ok: true, content: saved });
  } catch (err) {
    console.error("Saving site content failed", err);
    return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
  }
}
