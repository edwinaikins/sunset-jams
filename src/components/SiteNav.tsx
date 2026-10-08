"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content";

export default function SiteNav({ c }: { c: SiteContent["nav"] }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`site-nav${scrolled ? " scrolled" : ""}`}>
      <div className="brand">
        <span className="brand-mark">{c.brandMark}</span>
        <span>
          {c.brandName}
          <small>{c.brandSub}</small>
        </span>
      </div>
      <div className="nav-links">
        <a href="#why">Why</a>
        <a href="#about">About</a>
        <a href="#details">Details</a>
        <a href="#contact">Contact</a>
      </div>
      <a className="nav-cta" href="#rsvp">
        {c.ctaLabel}
      </a>
    </nav>
  );
}
