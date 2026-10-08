const PHASES = [
  { num: "PHASE 01", title: "Arrive", time: "Doors", strong: "1:00 PM" },
  { num: "PHASE 02", title: "Gold Hour", time: "Sun dips, sound builds", strong: "" },
  { num: "PHASE 03", title: "After Dark", time: "The main sets land", strong: "" },
  { num: "PHASE 04", title: "Encore", time: "Runs", strong: "till late" },
];

export default function ArcSection() {
  return (
    <section className="arc-section">
      <div className="wrap">
        <div className="section-head">
          <h2>The arc of the day</h2>
          <p>One ticket stub, four phases. Doors open in daylight and the night finds its own way from there.</p>
        </div>
        <div className="arc-rail">
          {PHASES.map((p) => (
            <div className="arc-stub" key={p.num}>
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
