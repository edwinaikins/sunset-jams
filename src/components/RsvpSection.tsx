"use client";

import { FormEvent, useState } from "react";
import type { SiteContent } from "@/lib/content";

type Status = "idle" | "pending" | "ok" | "err";

export default function RsvpSection({ c }: { c: SiteContent["rsvp"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      guests: Number(data.get("guests") || 1),
      notes: String(data.get("notes") || "").trim(),
    };
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="rsvp-section" id="rsvp">
      <div className="wrap">
        <div className="section-head">
          <h2>{c.heading}</h2>
          <p>{c.intro}</p>
        </div>
        <div className="form-card">
          {status === "ok" ? (
<p className="form-status ok">{c.success}</p>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="form-grid two">
                <div className="field">
                  <label htmlFor="rsvp-name">Full name</label>
                  <input id="rsvp-name" name="name" required placeholder="Ama Mensah" />
                </div>
                <div className="field">
                  <label htmlFor="rsvp-phone">Phone / WhatsApp</label>
                  <input id="rsvp-phone" name="phone" required placeholder="024 000 0000" />
                </div>
                <div className="field">
                  <label htmlFor="rsvp-email">Email (optional)</label>
                  <input id="rsvp-email" name="email" type="email" placeholder="you@example.com" />
                </div>
                <div className="field">
                  <label htmlFor="rsvp-guests">Guests (including you)</label>
                  <input id="rsvp-guests" name="guests" type="number" min={1} max={20} defaultValue={1} required />
                </div>
              </div>
              <div className="field" style={{ marginTop: 16 }}>
                <label htmlFor="rsvp-notes">Anything we should know? (optional)</label>
                <textarea id="rsvp-notes" name="notes" placeholder="Dietary notes, accessibility needs, etc." />
              </div>
              <div className="form-foot">
                <button className="btn btn-primary" type="submit" disabled={status === "pending"}>
                  {status === "pending" ? "Sending…" : c.buttonLabel}
                </button>
                {c.note && <p className="form-note">{c.note}</p>}
              </div>
              {status === "err" && <p className="admin-field-error">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
