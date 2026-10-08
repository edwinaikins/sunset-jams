import { InstagramIcon, FacebookIcon, XIcon, TikTokIcon } from "./icons";
import type { SiteContent } from "@/lib/content";
import { safeUrl } from "@/lib/content";

export default function SiteFooter({ c }: { c: SiteContent["footer"] }) {
  const socials = [
    { href: safeUrl(c.instagram), icon: <InstagramIcon />, label: "Instagram" },
    { href: safeUrl(c.facebook), icon: <FacebookIcon />, label: "Facebook" },
    { href: safeUrl(c.x), icon: <XIcon />, label: "X" },
    { href: safeUrl(c.tiktok), icon: <TikTokIcon />, label: "TikTok" },
  ].filter((s) => s.href);

  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-tag">
            <h2>
              {c.heading}{" "}
              <span className="script" style={{ color: "var(--accent-2)" }}>
                {c.headingScript}
              </span>
            </h2>
            <p>{c.intro}</p>
          </div>
          <div className="social-row">
            {socials.map((s) => (
              <a key={s.label} className="social-pill" href={s.href} target="_blank" rel="noopener">
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>{c.copyright}</span>
          <span className="hashtag">{c.hashtag}</span>
        </div>
      </div>
    </footer>
  );
}
