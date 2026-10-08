import type { SiteContent } from "@/lib/content";
import { paragraphs, safeUrl } from "@/lib/content";

export default function AboutSection({ c }: { c: SiteContent["about"] }) {
  const img = safeUrl(c.imageUrl);
  return (
    <section className="about-section" id="about">
      <div className="wrap">
        <div className="split">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2>
              {c.heading} <span className="script">{c.headingScript}</span>
            </h2>
            {paragraphs(c.body).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {img && (
            <div className="poster-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={c.imageAlt} width={1600} height={1143} style={{ height: "auto" }} />
              <div className="poster-tag">
                <span>{c.tagSmall}</span>
                <strong>{c.tagStrong}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
