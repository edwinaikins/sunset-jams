"use client";

import { useState } from "react";
import type { SiteContent, TablePackage } from "@/lib/content";
import { lines, phoneLinks, splitQty } from "@/lib/content";

type Tier = { key: "gold" | "red" | "pink"; name: string; packages: TablePackage[] };

export const BOOK_PACKAGE_EVENT = "sj:book-package";

function priceRange(list: TablePackage[]) {
  const prices = list.map((p) => p.price.trim()).filter(Boolean);
  if (prices.length === 0) return "";
  if (prices.length === 1) return prices[0];
  return `${prices[0]} – ${prices[prices.length - 1]}`;
}

export default function TablePackagesSection({ c }: { c: SiteContent["packages"] }) {
  const tiers: Tier[] = (
    [
      { key: "gold", name: c.ballersName, packages: c.ballers },
      { key: "red", name: c.kingsName, packages: c.kings },
      { key: "pink", name: c.queensName, packages: c.queens },
    ] as Tier[]
  ).filter((t) => t.name.trim() && t.packages.some((p) => p.price.trim()));

  const [active, setActive] = useState(0);
  const tier = tiers[Math.min(active, tiers.length - 1)];
  const phones = phoneLinks(c.phones);
  const cur = c.currency.trim();

  if (!tier) return null;

  function book(p: TablePackage) {
    const value = `${tier.name} · ${cur ? cur + " " : ""}${p.price.trim()}`;
    window.dispatchEvent(new CustomEvent(BOOK_PACKAGE_EVENT, { detail: value }));
    document.getElementById("vip")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="tables-section" id="tables">
      <div className="tables-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2>
              {c.heading} <span className="script">{c.headingScript}</span>
            </h2>
          </div>
          <p>{c.intro}</p>
        </div>

        <div className="tier-tabs" role="tablist" aria-label="Table package tiers">
          {tiers.map((t, i) => (
            <button
              key={t.key}
              role="tab"
              id={`tier-tab-${t.key}`}
              aria-selected={i === active}
              aria-controls={`tier-panel-${t.key}`}
              className={`tier-tab tier-${t.key}${i === active ? " active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="tier-tab-name">{t.name}</span>
              <span className="tier-tab-range">
                {cur ? `${cur} ` : ""}
                {priceRange(t.packages)}
              </span>
            </button>
          ))}
        </div>

        <div
          key={tier.key}
          className={`tier-panel tier-${tier.key}`}
          role="tabpanel"
          id={`tier-panel-${tier.key}`}
          aria-labelledby={`tier-tab-${tier.key}`}
        >
          <div className="tier-title">
            <h3>{tier.name}</h3>
            <span>Table packages</span>
          </div>
          <div className="pkg-grid">
            {tier.packages
              .filter((p) => p.price.trim())
              .map((p, i) => {
                const mixers = p.mixers
                  .split("|")
                  .map((m) => m.trim())
                  .filter(Boolean);
                return (
                  <article className="pkg-card" key={i} style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="pkg-price">
                      {cur && <span className="pkg-cur">{cur}</span>}
                      <strong>{p.price}</strong>
                      <span className="pkg-label">Table package</span>
                    </div>
                    <ul className="pkg-drinks">
                      {lines(p.drinks).map((d, j) => {
                        const { name, qty } = splitQty(d);
                        return (
                          <li key={j}>
                            <span className="pkg-dot" aria-hidden="true" />
                            <span className="pkg-drink">{name}</span>
                            {qty && <span className="pkg-qty">×{qty}</span>}
                          </li>
                        );
                      })}
                    </ul>
                    {mixers.length > 0 && (
                      <div className="pkg-mixers">
                        <span className="pkg-mixers-label">Mixers</span>
                        <div>
                          {mixers.map((m, j) => {
                            const { name, qty } = splitQty(m);
                            return (
                              <span className="pkg-mixer" key={j}>
                                {name}
                                {qty && <b>×{qty}</b>}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <button type="button" className="pkg-book" onClick={() => book(p)}>
                      {c.bookLabel} <span aria-hidden="true">→</span>
                    </button>
                  </article>
                );
              })}
          </div>
        </div>

        {phones.length > 0 && (
          <div className="tables-phone">
            <span className="tables-phone-label">{c.phoneLabel}</span>
            <div className="tables-phone-nums">
              {phones.map((ph) => (
                <span className="tables-phone-num" key={ph.tel}>
                  <a href={`tel:${ph.tel}`}>{ph.label}</a>
                  <a className="wa" href={ph.wa} target="_blank" rel="noopener" aria-label={`WhatsApp ${ph.label}`}>
                    WhatsApp
                  </a>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
