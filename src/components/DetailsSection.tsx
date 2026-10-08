import { CalendarIcon, ClockIcon, PinIcon } from "./icons";

export default function DetailsSection() {
  return (
    <section className="details-section" id="details">
      <div className="wrap">
        <div className="details-card">
          <div>
            <span className="eyebrow">The details</span>
            <h2>
              Save the date. <span className="script">Venue drops soon.</span>
            </h2>
            <p>
              We&rsquo;re locking the exact spot in Accra now — everyone following @sunsetjamsgh will hear it first,
              well ahead of the 6th.
            </p>
          </div>
          <div>
            <div className="details-row">
              <CalendarIcon />
              <div>
                <div className="label">Date</div>
                <div className="value">Sunday, 06 December 2026</div>
                <div className="hint">Mark it — this is a one-day event</div>
              </div>
            </div>
            <div className="details-row">
              <ClockIcon />
              <div>
                <div className="label">Time</div>
                <div className="value">1:00 PM until late</div>
                <div className="hint">Come for the sunset, stay well past it</div>
              </div>
            </div>
            <div className="details-row">
              <PinIcon />
              <div>
                <div className="label">Location</div>
                <div className="value">Accra, Ghana</div>
                <div className="hint">Exact venue to be announced</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
