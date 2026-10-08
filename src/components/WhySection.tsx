const REASONS = [
  {
    num: "01",
    title: "It's a homecoming",
    body: "Volume 1 brings Jam Grove back to the open-air format that started it all — back to the roots, back to the vibes, back to the people who've been asking for it.",
  },
  {
    num: "02",
    title: "It's built for the whole day",
    body: "This isn't a two-hour set. Doors open at 1PM and the day moves with the sun — through gold hour, into the night, and however far past that it wants to go.",
  },
  {
    num: "03",
    title: "It's the first of something new",
    body: "Volume 1 means there's a Volume 2 coming. Show up for this one and you're part of the story from the start, not catching up later.",
  },
  {
    num: "04",
    title: "It's about who's in the room",
    body: "Good food and good drinks are a given. What makes it Sunset Jams is the crowd — the kind of energy that turns strangers into your new plug.",
  },
];

export default function WhySection() {
  return (
    <section className="why-section" id="why">
      <div className="wrap">
        <div className="section-head">
          <h2>Why Sunset Jams?</h2>
          <p>Plenty of parties happen in Accra on a Sunday. Here&rsquo;s what makes this one worth clearing your afternoon for.</p>
        </div>
        <div className="why-grid">
          {REASONS.map((r) => (
            <div className="why-card" key={r.num}>
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
