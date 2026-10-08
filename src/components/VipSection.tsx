"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { SiteContent } from "@/lib/content";
import { packageOptions } from "@/lib/content";
import { BOOK_PACKAGE_EVENT } from "./TablePackagesSection";

type Status = "idle" | "pending" | "ok" | "err";

export default function VipSection({ c, packages }: { c: SiteContent["vip"]; packages: SiteContent["packages"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [type, setType] = useState("vip_table");
  const [pkg, setPkg] = useState("");
  const options = useMemo(() => packageOptions(packages), [packages]);
  const tiers = useMemo(() => Array.from(new Set(options.map((o) => o.tier))), [options]);

  useEffect(() => {
    const onBook = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      setType("vip_table");
      setPkg(value);
      setStatus("idle");
    };
    window.addEventListener(BOOK_PACKAGE_EVENT, onBook);
    return () => window.removeEventListener(BOOK_PACKAGE_EVENT, onBook);
  }, []);

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
      booking_type: type,
      package: type === "vip_table" ? pkg : "",
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
      setPkg("");
      setType("vip_table");
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="vip-section" id="vip">
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
              {pkg && type === "vip_table" && (
                <div className="pkg-picked">
                  <span>
                    Requesting the <strong>{pkg}</strong> package
                  </span>
                  <a href="#tables">Change package</a>
                </div>
              )}
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
                  <select id="vip-type" name="booking_type" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="vip_table">VIP / reserved table</option>
                    <option value="vendor">Food &amp; drink vendor spot</option>
                    <option value="sponsor">Brand / sponsor booth</option>
                  </select>
                </div>
                {type === "vip_table" && options.length > 0 && (
                  <div className="field">
                    <label htmlFor="vip-package">Table package</label>
                    <select id="vip-package" name="package" value={pkg} onChange={(e) => setPkg(e.target.value)}>
                      <option value="">Not sure yet — call me</option>
                      {tiers.map((t) => (
                        <optgroup key={t} label={t}>
                          {options
                            .filter((o) => o.tier === t)
                            .map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                )}
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
