import type { SiteContent, Sponsor } from "@/lib/content";
import { safeUrl } from "@/lib/content";

function Logo({ s, size }: { s: Sponsor; size: "lg" | "sm" }) {
  const src = safeUrl(s.logoUrl);
  const href = safeUrl(s.link);
  const inner = src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={s.name} loading="lazy" />
  ) : (
    <span className="sponsor-name">{s.name}</span>
  );
  const cls = `sponsor-tile ${size}`;
  return href ? (
    <a className={cls} href={href} target="_blank" rel="noopener" title={s.name}>
      {inner}
    </a>
  ) : (
    <div className={cls} title={s.name}>
      {inner}
    </div>
  );
}

export default function SponsorsSection({ c }: { c: SiteContent["sponsors"] }) {
  const has = (l: Sponsor[]) => l.filter((s) => s.name.trim() || s.logoUrl.trim());
  const powered = has(c.powered);
  const supported = has(c.supported);
  const partners = has(c.partners);
  if (!powered.length && !supported.length && !partners.length) return null;

  return (
    <section className="sponsors-section" id="sponsors">
      <div className="wrap">
        <div className="sponsors-head">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2>
            {c.heading} <span className="script">{c.headingScript}</span>
          </h2>
        </div>

        {(powered.length > 0 || supported.length > 0) && (
          <div className="sponsor-top">
            {powered.length > 0 && (
              <div className="sponsor-group">
                <span className="sponsor-label">{c.poweredLabel}</span>
                <div className="sponsor-row">
                  {powered.map((s, i) => (
                    <Logo key={i} s={s} size="lg" />
                  ))}
                </div>
              </div>
            )}
            {supported.length > 0 && (
              <div className="sponsor-group">
                <span className="sponsor-label">{c.supportedLabel}</span>
                <div className="sponsor-row">
                  {supported.map((s, i) => (
                    <Logo key={i} s={s} size="lg" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {partners.length > 0 && (
          <div className="sponsor-group partners">
            <span className="sponsor-label">{c.partnersLabel}</span>
            <div className="sponsor-grid">
              {partners.map((s, i) => (
                <Logo key={i} s={s} size="sm" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
