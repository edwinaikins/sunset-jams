import { ensureSchema, getPool } from "@/lib/db";
import { DEFAULT_CONTENT, SiteContent, normaliseContent } from "@/lib/content";

const KEY = "site";

// Loads the saved content, filling any gaps with the defaults. If the database
// is unreachable the public site still renders with the default copy.
export async function getSiteContent(): Promise<SiteContent> {
  try {
    await ensureSchema();
    const { rows } = await getPool().query(`SELECT value FROM site_content WHERE key = $1`, [KEY]);
    if (rows.length === 0) return DEFAULT_CONTENT;
    return normaliseContent(rows[0].value);
  } catch (err) {
    console.error("Could not load site content; using defaults", err);
    return DEFAULT_CONTENT;
  }
}

export async function saveSiteContent(input: unknown): Promise<SiteContent> {
  const content = normaliseContent(input);
  await ensureSchema();
  await getPool().query(
    `INSERT INTO site_content (key, value, updated_at) VALUES ($1, $2, now())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [KEY, JSON.stringify(content)]
  );
  return content;
}
