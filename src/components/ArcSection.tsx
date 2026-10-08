import type { SiteContent } from "@/lib/content";

export default function ArcSection({ c }: { c: SiteContent["arc"] }) {
  return (
    <section className="arc-section">
      <div className="wrap">
        <div className="section-head">
          <h2>{c.heading}</h2>
          <p>{c.intro}</p>
        </div>
        <div className="arc-rail">
          {c.phases.map((p, i) => (
            <div className="arc-stub" key={i}>
              <span className="arc-num">{p.num}</span>
              <h3>{p.title}</h3>
              <span className="arc-time">
                {p.time} {p.strong && <strong>{p.strong}</strong>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
