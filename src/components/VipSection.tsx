"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "pending" | "ok" | "err";

export default function VipSection() {
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
      party_size: Number(data.get("party_size") || 1),
      booking_type: String(data.get("booking_type") || "vip_table"),
      message: String(data.get("message") || "").trim(),
    };
    try {
      const res = await fetch("/api/bookings", {
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
    <section className="vip-section" id="vip">
      <div className="wrap">
        <div className="section-head">
          <h2>VIP tables &amp; vendor spots</h2>
          <p>Want a reserved table, or a stall at Sunset Jams? Tell us what you need and we&rsquo;ll follow up.</p>
        </div>
        <div className="form-card">
          {status === "ok" ? (
            <p className="form-status ok">
              Request received. We&rsquo;ll reach out on the contact details you gave us to confirm availability.
            </p>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="form-grid two">
                <div className="field">
                  <label htmlFor="vip-name">Full name</label>
                  <input id="vip-name" name="name" required placeholder="Kwame Owusu" />
                </div>
                <div className="field">
                  <label htmlFor="vip-phone">Phone / WhatsApp</label>
                  <input id="vip-phone" name="phone" required placeholder="024 000 0000" />
                </div>
                <div className="field">
                  <label htmlFor="vip-email">Email (optional)</label>
                  <input id="vip-email" name="email" type="email" placeholder="you@example.com" />
                </div>
                <div className="field">
                  <label htmlFor="vip-type">What are you booking?</label>
                  <select id="vip-type" name="booking_type" defaultValue="vip_table">
                    <option value="vip_table">VIP / reserved table</option>
                    <option value="vendor">Food &amp; drink vendor spot</option>
                    <option value="sponsor">Brand / sponsor booth</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="vip-party">Party size</label>
                  <input id="vip-party" name="party_size" type="number" min={1} max={50} defaultValue={4} required />
                </div>
              </div>
              <div className="field" style={{ marginTop: 16 }}>
                <label htmlFor="vip-message">Tell us more (optional)</label>
                <textarea
                  id="vip-message"
                  name="message"
                  placeholder="What you're looking for — table near the stage, vendor setup needs, sponsorship ideas…"
                />
              </div>
              <div className="form-foot">
                <button className="btn btn-primary" type="submit" disabled={status === "pending"}>
                  {status === "pending" ? "Sending…" : "Send request"}
                </button>
                <p className="form-note">This isn&rsquo;t a payment — it&rsquo;s a request. We&rsquo;ll confirm details with you directly.</p>
              </div>
              {status === "err" && <p className="admin-field-error">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
