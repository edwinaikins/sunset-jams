import { ForkKnifeIcon, CupIcon, PeopleIcon } from "./icons";

import type { SiteContent } from "@/lib/content";

const ICONS = [<ForkKnifeIcon key="f" />, <CupIcon key="c" />, <PeopleIcon key="p" />];

export default function FeaturesSection({ c }: { c: SiteContent["features"] }) {
  return (
    <section className="features-section">
      <div className="wrap">
        <div className="section-head">
          <h2>{c.heading}</h2>
          <p>{c.intro}</p>
        </div>
        <div className="features-grid">
          {c.items.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{ICONS[i % ICONS.length]}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
