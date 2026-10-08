import { CalendarIcon, ClockIcon, PinIcon } from "./icons";
import type { SiteContent } from "@/lib/content";

export default function DetailsSection({ c }: { c: SiteContent["details"] }) {
  return (
    <section className="details-section" id="details">
      <div className="wrap">
        <div className="details-card">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2>
              {c.heading} <span className="script">{c.headingScript}</span>
            </h2>
<p>{c.body}</p>
          </div>
          <div>
            <div className="details-row">
              <CalendarIcon />
              <div>
                <div className="label">Date</div>
                <div className="value">{c.date}</div>
                <div className="hint">{c.dateHint}</div>
              </div>
            </div>
            <div className="details-row">
              <ClockIcon />
              <div>
                <div className="label">Time</div>
                <div className="value">{c.time}</div>
                <div className="hint">{c.timeHint}</div>
              </div>
            </div>
            <div className="details-row">
              <PinIcon />
              <div>
                <div className="label">Location</div>
                <div className="value">{c.location}</div>
                <div className="hint">{c.locationHint}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
