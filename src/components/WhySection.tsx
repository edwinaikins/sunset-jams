import type { SiteContent } from "@/lib/content";

export default function WhySection({ c }: { c: SiteContent["why"] }) {
  return (
    <section className="why-section" id="why">
      <div className="wrap">
        <div className="section-head">
          <h2>{c.heading}</h2>
          <p>{c.intro}</p>
        </div>
        <div className="why-grid">
          {c.reasons.map((r, i) => (
            <div className="why-card" key={i}>
              <span className="why-num">{r.num}</span>
              <div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
