import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="wrap">
        <div className="split">
          <div>
            <span className="eyebrow">You are invited</span>
            <h2>
              Where sunset <span className="script">meets the sound.</span>
            </h2>
            <p>
              Sunset Jams Vol. 1: The Homecoming is Jam Grove Entertainment&rsquo;s all-new open-air experience — a
              full day-to-night gathering built around good music, delicious food, great people and energy that
              doesn&rsquo;t quit.
            </p>
            <p>
              It&rsquo;s a homecoming in the truest sense: back to the roots, back to the vibes, back to the
              community that made the sound worth chasing in the first place.
            </p>
          </div>
          <div className="poster-card">
            <Image src="/hero-poster.jpg" alt="Sunset Jams official flyer" width={1600} height={1143} />
            <div className="poster-tag">
              <span>Official flyer</span>
              <strong>#SUNSETJAMS</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
