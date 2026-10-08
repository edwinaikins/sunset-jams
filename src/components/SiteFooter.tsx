import { InstagramIcon, FacebookIcon, XIcon, TikTokIcon } from "./icons";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-tag">
            <h2>
              Follow for <span className="script" style={{ color: "var(--accent-2)" }}>updates.</span>
            </h2>
            <p>Venue, lineup and everything else lands on these first.</p>
          </div>
          <div className="social-row">
            <a className="social-pill" href="https://instagram.com/sunsetjamsgh" target="_blank" rel="noopener">
              <InstagramIcon />
              Instagram
            </a>
            <a className="social-pill" href="https://facebook.com/sunsetjamsgh" target="_blank" rel="noopener">
              <FacebookIcon />
              Facebook
            </a>
            <a className="social-pill" href="https://x.com/sunsetjamsgh" target="_blank" rel="noopener">
              <XIcon />X
            </a>
            <a className="social-pill" href="https://tiktok.com/@sunsetjamsgh" target="_blank" rel="noopener">
              <TikTokIcon />
              TikTok
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Jam Grove Entertainment &middot; Sunset Jams Vol. 1</span>
          <span className="hashtag">#SUNSETJAMS</span>
        </div>
      </div>
    </footer>
  );
}
