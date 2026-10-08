"use client";

import { useEffect, useState } from "react";

export default function SiteNav() {
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
        <span className="brand-mark">JG</span>
        <span>
          JAM GROVE ENTERTAINMENT
          <small>Sunset Jams &middot; Vol. 1</small>
        </span>
      </div>
      <div className="nav-links">
        <a href="#why">Why</a>
        <a href="#about">About</a>
        <a href="#details">Details</a>
        <a href="#contact">Contact</a>
      </div>
      <a className="nav-cta" href="#rsvp">
        RSVP free
      </a>
    </nav>
  );
}
