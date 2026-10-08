// Editable site content: the shape, the defaults (the original copy), the
// editor's field layout, and a normaliser that validates anything saved.
// Safe to import from both server and client code (no database access here).

export type Phase = { num: string; title: string; time: string; strong: string };
export type Reason = { num: string; title: string; body: string };
export type Feature = { title: string; body: string };

export type SiteContent = {
  meta: { title: string; description: string };
  nav: { brandMark: string; brandName: string; brandSub: string; ctaLabel: string };
  hero: {
    eyebrow: string;
    logoUrl: string;
    logoAlt: string;
    backgroundUrl: string;
    subtitle: string;
    subtitleScript: string;
    line: string;
    date: string;
    time: string;
    location: string;
    primaryCta: string;
    secondaryCta: string;
    marquee: string;
  };
  arc: { heading: string; intro: string; phases: Phase[] };
  why: { heading: string; intro: string; reasons: Reason[] };
  about: {
    eyebrow: string;
    heading: string;
    headingScript: string;
    body: string;
    imageUrl: string;
    imageAlt: string;
    tagSmall: string;
    tagStrong: string;
  };
  features: { heading: string; intro: string; items: Feature[] };
  rsvp: { heading: string; intro: string; buttonLabel: string; note: string; success: string };
  save: {
    eyebrow: string;
    heading: string;
    headingScript: string;
    body: string;
    imageUrl: string;
    imageAlt: string;
    tagSmall: string;
    tagStrong: string;
  };
  vip: { heading: string; intro: string; buttonLabel: string; note: string; success: string };
  details: {
    eyebrow: string;
    heading: string;
    headingScript: string;
    body: string;
    date: string;
    dateHint: string;
    time: string;
    timeHint: string;
    location: string;
    locationHint: string;
  };
  contact: { heading: string; intro: string; buttonLabel: string; success: string };
  footer: {
    heading: string;
    headingScript: string;
    intro: string;
    instagram: string;
    facebook: string;
    x: string;
    tiktok: string;
    copyright: string;
    hashtag: string;
  };
};

export const DEFAULT_CONTENT: SiteContent = {
  meta: {
    title: "Sunset Jams Vol. 1 — The Homecoming",
    description:
      "Sunset Jams Vol. 1: The Homecoming — Jam Grove Entertainment's all-new open-air experience. Sunday, 6 December 2026, 1:00 PM till late, Accra. RSVP free.",
  },
  nav: {
    brandMark: "JG",
    brandName: "JAM GROVE ENTERTAINMENT",
    brandSub: "Sunset Jams · Vol. 1",
    ctaLabel: "RSVP free",
  },
  hero: {
    eyebrow: "Jam Grove Entertainment presents · The all-new open-air experience",
    logoUrl: "/logo.png",
    logoAlt: "Sunset Jams — where sunset meets the sound",
    backgroundUrl: "/hero-bg.jpg",
    subtitle: "Volume 1",
    subtitleScript: "— The Homecoming",
    line: "Back to the roots. Back to the vibes. A day-to-night open-air experience of music, food and community, right here in Accra.",
    date: "Sun, 06 Dec 2026",
    time: "1:00 PM till late",
    location: "Accra · venue TBA",
    primaryCta: "RSVP — it’s free",
    secondaryCta: "Reserve a VIP table",
    marquee: "Music, Food, Vibes, Community",
  },
  arc: {
    heading: "The arc of the day",
    intro: "One ticket stub, four phases. Doors open in daylight and the night finds its own way from there.",
    phases: [
      { num: "PHASE 01", title: "Arrive", time: "Doors", strong: "1:00 PM" },
      { num: "PHASE 02", title: "Gold Hour", time: "Sun dips, sound builds", strong: "" },
      { num: "PHASE 03", title: "After Dark", time: "The main sets land", strong: "" },
      { num: "PHASE 04", title: "Encore", time: "Runs", strong: "till late" },
    ],
  },
  why: {
    heading: "Why Sunset Jams?",
    intro: "Plenty of parties happen in Accra on a Sunday. Here’s what makes this one worth clearing your afternoon for.",
    reasons: [
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
    ],
  },
  about: {
    eyebrow: "You are invited",
    heading: "Where sunset",
    headingScript: "meets the sound.",
    body: "Sunset Jams Vol. 1: The Homecoming is Jam Grove Entertainment’s all-new open-air experience — a full day-to-night gathering built around good music, delicious food, great people and energy that doesn’t quit.\n\nIt’s a homecoming in the truest sense: back to the roots, back to the vibes, back to the community that made the sound worth chasing in the first place.",
    imageUrl: "/hero-poster.jpg",
    imageAlt: "Sunset Jams official flyer",
    tagSmall: "Official flyer",
    tagStrong: "#SUNSETJAMS",
  },
  features: {
    heading: "What’s waiting for you",
    intro: "Three things Sunset Jams never runs short on.",
    items: [
      { title: "Delicious food", body: "Tasty bites all day, from the first plate at 1PM to whatever you're craving after dark." },
      { title: "Refreshing drinks", body: "Cold drinks, strong vibes — the bar keeps pace with the sun going down and the set going up." },
      { title: "Amazing energy", body: "Great people, great memories — the kind of room that turns strangers into your new plug." },
    ],
  },
  rsvp: {
    heading: "RSVP — it’s free",
    intro: "Let us know you’re coming so we can plan the day around you. No ticket, no charge.",
    buttonLabel: "Confirm my RSVP",
    note: "We’ll never share your info or spam you.",
    success: "You’re on the list! Screenshot this or watch @sunsetjamsgh for updates before 6 December.",
  },
  save: {
    eyebrow: "Save it, share it",
    heading: "Where sunset",
    headingScript: "meets the sound.",
    body: "Screenshot the flyer, drop it in your group chat, tag whoever’s coming with you. The venue’s still under wraps, but the date is locked — Sunday, 6 December, from 1PM till late.",
    imageUrl: "/cup-poster.jpg",
    imageAlt: "Sunset Jams — save the date",
    tagSmall: "Homecoming edition",
    tagStrong: "Jam Grove",
  },
  vip: {
    heading: "VIP tables & vendor spots",
    intro: "Want a reserved table, or a stall at Sunset Jams? Tell us what you need and we’ll follow up.",
    buttonLabel: "Send request",
    note: "This isn’t a payment — it’s a request. We’ll confirm details with you directly.",
    success: "Request received. We’ll reach out on the contact details you gave us to confirm availability.",
  },
  details: {
    eyebrow: "The details",
    heading: "Save the date.",
    headingScript: "Venue drops soon.",
    body: "We’re locking the exact spot in Accra now — everyone following @sunsetjamsgh will hear it first, well ahead of the 6th.",
    date: "Sunday, 06 December 2026",
    dateHint: "Mark it — this is a one-day event",
    time: "1:00 PM until late",
    timeHint: "Come for the sunset, stay well past it",
    location: "Accra, Ghana",
    locationHint: "Exact venue to be announced",
  },
  contact: {
    heading: "Get in touch",
    intro: "Press, collabs, or just a question — drop us a line and we’ll get back to you.",
    buttonLabel: "Send message",
    success: "Message sent — thanks! We’ll reply as soon as we can.",
  },
  footer: {
    heading: "Follow for",
    headingScript: "updates.",
    intro: "Venue, lineup and everything else lands on these first.",
    instagram: "https://instagram.com/sunsetjamsgh",
    facebook: "https://facebook.com/sunsetjamsgh",
    x: "https://x.com/sunsetjamsgh",
    tiktok: "https://tiktok.com/@sunsetjamsgh",
    copyright: "© 2026 Jam Grove Entertainment · Sunset Jams Vol. 1",
    hashtag: "#SUNSETJAMS",
  },
};

// ---------- Editor layout ----------

export type TextField = { key: string; label: string; kind: "text" | "textarea" | "url" | "image"; hint?: string };
export type ListField = {
  key: string;
  label: string;
  kind: "list";
  itemLabel: string;
  fields: TextField[];
  max: number;
  hint?: string;
};
export type Field = TextField | ListField;
export type SectionSpec = { key: keyof SiteContent; title: string; description: string; fields: Field[] };

const IMAGE_HINT = "Upload an image, pick one you uploaded before, or paste a link.";

const t = (key: string, label: string, hint?: string): TextField => ({ key, label, kind: "text", hint });
const ta = (key: string, label: string, hint?: string): TextField => ({ key, label, kind: "textarea", hint });
const u = (key: string, label: string, hint?: string): TextField => ({ key, label, kind: "url", hint });
const im = (key: string, label: string): TextField => ({ key, label, kind: "image", hint: IMAGE_HINT });

export const SECTIONS: SectionSpec[] = [
  {
    key: "meta",
    title: "Search & sharing",
    description: "The browser-tab title and the summary Google and link previews show.",
    fields: [t("title", "Page title"), ta("description", "Description")],
  },
  {
    key: "nav",
    title: "Top navigation",
    description: "The bar pinned to the top of the page.",
    fields: [
      t("brandMark", "Logo initials"),
      t("brandName", "Brand name"),
      t("brandSub", "Brand subtitle"),
      t("ctaLabel", "Button label"),
    ],
  },
  {
    key: "hero",
    title: "Hero (top banner)",
    description: "The first thing visitors see.",
    fields: [
      t("eyebrow", "Small line above the logo"),
      im("logoUrl", "Logo image"),
      t("logoAlt", "Logo description (for screen readers)"),
      im("backgroundUrl", "Background image"),
      t("subtitle", "Subtitle"),
      t("subtitleScript", "Subtitle (handwritten part)"),
      ta("line", "Intro line"),
      t("date", "Date"),
      t("time", "Time"),
      t("location", "Location"),
      t("primaryCta", "Main button"),
      t("secondaryCta", "Second button"),
      t("marquee", "Scrolling words", "Separate words with commas."),
    ],
  },
  {
    key: "arc",
    title: "The arc of the day",
    description: "The four-phase timeline.",
    fields: [
      t("heading", "Heading"),
      ta("intro", "Intro"),
      {
        key: "phases",
        label: "Phases",
        kind: "list",
        itemLabel: "Phase",
        max: 8,
        fields: [t("num", "Label"), t("title", "Title"), t("time", "Time text"), t("strong", "Bold time text (optional)")],
      },
    ],
  },
  {
    key: "why",
    title: "Why Sunset Jams?",
    description: "The numbered reasons grid.",
    fields: [
      t("heading", "Heading"),
      ta("intro", "Intro"),
      {
        key: "reasons",
        label: "Reasons",
        kind: "list",
        itemLabel: "Reason",
        max: 8,
        fields: [t("num", "Number"), t("title", "Title"), ta("body", "Text")],
      },
    ],
  },
  {
    key: "about",
    title: "About / invitation",
    description: "Text beside the official flyer.",
    fields: [
      t("eyebrow", "Small label"),
      t("heading", "Heading"),
      t("headingScript", "Heading (handwritten part)"),
      ta("body", "Text", "Leave a blank line between paragraphs."),
      im("imageUrl", "Flyer image"),
      t("imageAlt", "Flyer description"),
      t("tagSmall", "Flyer caption (small)"),
      t("tagStrong", "Flyer caption (bold)"),
    ],
  },
  {
    key: "features",
    title: "What’s waiting for you",
    description: "The three feature cards. Icons stay in order: food, drink, people.",
    fields: [
      t("heading", "Heading"),
      ta("intro", "Intro"),
      {
        key: "items",
        label: "Cards",
        kind: "list",
        itemLabel: "Card",
        max: 6,
        fields: [t("title", "Title"), ta("body", "Text")],
      },
    ],
  },
  {
    key: "rsvp",
    title: "RSVP form",
    description: "Wording around the RSVP form.",
    fields: [
      t("heading", "Heading"),
      ta("intro", "Intro"),
      t("buttonLabel", "Button label"),
      t("note", "Note beside the button"),
      ta("success", "Message after submitting"),
    ],
  },
  {
    key: "save",
    title: "Save the date",
    description: "Text beside the second poster.",
    fields: [
      t("eyebrow", "Small label"),
      t("heading", "Heading"),
      t("headingScript", "Heading (handwritten part)"),
      ta("body", "Text", "Leave a blank line between paragraphs."),
      im("imageUrl", "Poster image"),
      t("imageAlt", "Poster description"),
      t("tagSmall", "Poster caption (small)"),
      t("tagStrong", "Poster caption (bold)"),
    ],
  },
  {
    key: "vip",
    title: "VIP & vendor form",
    description: "Wording around the booking form.",
    fields: [
      t("heading", "Heading"),
      ta("intro", "Intro"),
      t("buttonLabel", "Button label"),
      t("note", "Note beside the button"),
      ta("success", "Message after submitting"),
    ],
  },
  {
    key: "details",
    title: "Event details",
    description: "Date, time and venue card.",
    fields: [
      t("eyebrow", "Small label"),
      t("heading", "Heading"),
      t("headingScript", "Heading (handwritten part)"),
      ta("body", "Text"),
      t("date", "Date"),
      t("dateHint", "Date note"),
      t("time", "Time"),
      t("timeHint", "Time note"),
      t("location", "Location"),
      t("locationHint", "Location note"),
    ],
  },
  {
    key: "contact",
    title: "Contact form",
    description: "Wording around the contact form.",
    fields: [t("heading", "Heading"), ta("intro", "Intro"), t("buttonLabel", "Button label"), ta("success", "Message after sending")],
  },
  {
    key: "footer",
    title: "Footer",
    description: "Social links and the bottom line. Leave a link empty to hide that button.",
    fields: [
      t("heading", "Heading"),
      t("headingScript", "Heading (handwritten part)"),
      ta("intro", "Intro"),
      u("instagram", "Instagram link"),
      u("facebook", "Facebook link"),
      u("x", "X link"),
      u("tiktok", "TikTok link"),
      t("copyright", "Copyright line"),
      t("hashtag", "Hashtag"),
    ],
  },
];

// ---------- Validation ----------

const MAX_TEXT = 2000;

function cleanString(v: unknown, fallback: string): string {
  if (typeof v !== "string") return fallback;
  return v.slice(0, MAX_TEXT);
}

// Rebuilds `input` using `defaults` as the template: unknown keys are dropped,
// wrong types fall back to the default, and lists are capped in length.
function normalise(input: unknown, defaults: unknown, maxItems = 12): unknown {
  if (typeof defaults === "string") return cleanString(input, defaults);
  if (Array.isArray(defaults)) {
    if (!Array.isArray(input)) return defaults;
    const template = defaults[0];
    return input.slice(0, maxItems).map((item) => {
      const out: Record<string, string> = {};
      for (const k of Object.keys(template)) {
        out[k] = cleanString((item as any)?.[k], "");
      }
      return out;
    });
  }
  if (defaults && typeof defaults === "object") {
    const src = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
    const out: Record<string, unknown> = {};
    for (const [k, dv] of Object.entries(defaults)) {
      out[k] = k in src ? normalise(src[k], dv, maxItems) : dv;
    }
    return out;
  }
  return defaults;
}

export function normaliseContent(input: unknown): SiteContent {
  return normalise(input, DEFAULT_CONTENT) as SiteContent;
}

export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// Only allow same-site paths and http(s) links in href/src attributes.
export function safeUrl(url: string): string {
  const v = url.trim();
  if (v.startsWith("/") && !v.startsWith("//")) return v;
  if (/^https?:\/\//i.test(v)) return v;
  return "";
}
