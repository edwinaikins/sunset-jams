import { ForkKnifeIcon, CupIcon, PeopleIcon } from "./icons";

const FEATURES = [
  {
    icon: <ForkKnifeIcon />,
    title: "Delicious food",
    body: "Tasty bites all day, from the first plate at 1PM to whatever you're craving after dark.",
  },
  {
    icon: <CupIcon />,
    title: "Refreshing drinks",
    body: "Cold drinks, strong vibes — the bar keeps pace with the sun going down and the set going up.",
  },
  {
    icon: <PeopleIcon />,
    title: "Amazing energy",
    body: "Great people, great memories — the kind of room that turns strangers into your new plug.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="wrap">
        <div className="section-head">
          <h2>What&rsquo;s waiting for you</h2>
          <p>Three things Sunset Jams never runs short on.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
