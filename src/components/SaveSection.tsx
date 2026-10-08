import Image from "next/image";

export default function SaveSection() {
  return (
    <section className="save-section">
      <div className="wrap">
        <div className="split reverse">
          <div className="poster-card">
            <Image src="/cup-poster.jpg" alt="Sunset Jams — save the date" width={1000} height={1501} />
            <div className="poster-tag">
              <span>Homecoming edition</span>
              <strong>Jam Grove</strong>
            </div>
          </div>
          <div>
            <span className="eyebrow">Save it, share it</span>
            <h2>
              Where sunset <span className="script">meets the sound.</span>
            </h2>
            <p>
              Screenshot the flyer, drop it in your group chat, tag whoever&rsquo;s coming with you. The venue&rsquo;s
              still under wraps, but the date is locked — Sunday, 6 December, from 1PM till late.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
