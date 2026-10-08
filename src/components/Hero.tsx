import Image from "next/image";
import { CalendarIcon, ClockIcon, PinIcon } from "./icons";

const PARTICLES = [
  { l: "25.9%", s: "3.4px", d: "10.0s", delay: "8.5s", x: "40px", c: "var(--accent-3)" },
  { l: "8.2%", s: "2.6px", d: "8.4s", delay: "1.2s", x: "-22px", c: "var(--accent-2)" },
  { l: "63.5%", s: "4px", d: "11.2s", delay: "4.6s", x: "18px", c: "var(--accent)" },
  { l: "47.1%", s: "2.2px", d: "7.6s", delay: "0s", x: "-16px", c: "var(--accent-2)" },
  { l: "72.8%", s: "3px", d: "9.8s", delay: "6.1s", x: "26px", c: "var(--accent-3)" },
  { l: "18.4%", s: "3.8px", d: "10.6s", delay: "2.9s", x: "-30px", c: "var(--accent)" },
  { l: "88.6%", s: "2.4px", d: "8.9s", delay: "5.3s", x: "14px", c: "var(--accent-2)" },
  { l: "55.3%", s: "3.2px", d: "9.3s", delay: "7.7s", x: "-18px", c: "var(--accent-3)" },
  { l: "36.7%", s: "2.8px", d: "11.8s", delay: "3.4s", x: "22px", c: "var(--accent)" },
  { l: "95.1%", s: "3.6px", d: "9.0s", delay: "9.8s", x: "-24px", c: "var(--accent-2)" },
];

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-bgimg" aria-hidden="true" />
      <div className="hero-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            style={
              {
                "--l": p.l,
                "--s": p.s,
                "--d": p.d,
                "--delay": p.delay,
                "--x": p.x,
                "--c": p.c,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="hero-inner">
        <span className="eyebrow">Jam Grove Entertainment presents &middot; The all-new open-air experience</span>
        <h1>
          <Image
            className="hero-logo"
            src="/logo.png"
            alt="Sunset Jams — where sunset meets the sound"
            width={900}
            height={362}
            priority
          />
        </h1>
        <p className="hero-sub">
          Volume 1 <span className="script">— The Homecoming</span>
        </p>
        <p className="hero-line">
          Back to the roots. Back to the vibes. A day-to-night open-air experience of music, food and community,
          right here in Accra.
        </p>
        <div className="info-strip">
          <div className="info-cell">
            <CalendarIcon />
            <div>
              <div className="label">Date</div>
              <div className="value">Sun, 06 Dec 2026</div>
            </div>
          </div>
          <div className="info-cell">
            <ClockIcon />
            <div>
              <div className="label">Time</div>
              <div className="value">1:00 PM till late</div>
            </div>
          </div>
          <div className="info-cell">
            <PinIcon />
            <div>
              <div className="label">Location</div>
              <div className="value">Accra &middot; venue TBA</div>
            </div>
          </div>
        </div>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#rsvp">
            RSVP — it&rsquo;s free
          </a>
          <a className="btn btn-ghost" href="#vip">
            Reserve a VIP table
          </a>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Music</span>
          <span>Food</span>
          <span>Vibes</span>
          <span>Community</span>
          <span>Music</span>
          <span>Food</span>
          <span>Vibes</span>
          <span>Community</span>
        </div>
      </div>
    </header>
  );
}
