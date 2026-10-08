"use client";

import { FormEvent, useState } from "react";
import type { SiteContent } from "@/lib/content";

type Status = "idle" | "pending" | "ok" | "err";

export default function ContactSection({ c }: { c: SiteContent["contact"] }) {
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
      subject: String(data.get("subject") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };
    try {
      const res = await fetch("/api/contact", {
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
    <section className="contact-section" id="contact">
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
                  <label htmlFor="c-name">Name</label>
                  <input id="c-name" name="name" required placeholder="Your name" />
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" name="email" type="email" required placeholder="you@example.com" />
                </div>
              </div>
              <div className="field" style={{ marginTop: 16 }}>
                <label htmlFor="c-subject">Subject</label>
                <input id="c-subject" name="subject" placeholder="What's this about?" />
              </div>
              <div className="field" style={{ marginTop: 16 }}>
                <label htmlFor="c-message">Message</label>
                <textarea id="c-message" name="message" required placeholder="Write your message…" />
              </div>
              <div className="form-foot">
                <button className="btn btn-primary" type="submit" disabled={status === "pending"}>
                  {status === "pending" ? "Sending…" : c.buttonLabel}
                </button>
              </div>
              {status === "err" && <p className="admin-field-error">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
