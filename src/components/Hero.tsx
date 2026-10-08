import type { SiteContent } from "@/lib/content";
import { safeUrl } from "@/lib/content";
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

export default function Hero({ c }: { c: SiteContent["hero"] }) {
  const words = c.marquee
    .split(",")
    .map((w) => w.trim())
    .filter(Boolean);
  const bg = safeUrl(c.backgroundUrl);
  const logo = safeUrl(c.logoUrl);
  return (
    <header className="hero">
      <div
        className="hero-bgimg"
        aria-hidden="true"
        style={bg ? { backgroundImage: `url(${JSON.stringify(bg)})` } : undefined}
      />
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
        <span className="eyebrow">{c.eyebrow}</span>
        <h1>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="hero-logo" src={logo} alt={c.logoAlt} width={900} height={362} style={{ height: "auto" }} />
          ) : (
            c.logoAlt
          )}
        </h1>
        <p className="hero-sub">
          {c.subtitle} <span className="script">{c.subtitleScript}</span>
        </p>
<p className="hero-line">{c.line}</p>
        <div className="info-strip">
          <div className="info-cell">
            <CalendarIcon />
            <div>
              <div className="label">Date</div>
              <div className="value">{c.date}</div>
            </div>
          </div>
          <div className="info-cell">
            <ClockIcon />
            <div>
              <div className="label">Time</div>
              <div className="value">{c.time}</div>
            </div>
          </div>
          <div className="info-cell">
            <PinIcon />
            <div>
              <div className="label">Location</div>
              <div className="value">{c.location}</div>
            </div>
          </div>
        </div>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#rsvp">
            {c.primaryCta}
          </a>
          <a className="btn btn-ghost" href="#tables">
            {c.secondaryCta}
          </a>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...words, ...words].map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>
    </header>
  );
}
