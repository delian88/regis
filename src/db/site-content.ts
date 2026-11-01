import fs from 'fs';
import path from 'path';
import { client } from './connection';
import { DEFAULT_SITE_CONTENT, SiteContentMap } from './site-content-types';

export * from './site-content-types';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'site-content.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {
      // ignore
    }
  }
}

let inMemoryContentCache: SiteContentMap | null = null;
let lastDbFetchTime = 0;
const CACHE_TTL = 30000; // 30 seconds cache for snappy responsiveness

export async function getAllSiteContent(): Promise<SiteContentMap> {
  const now = Date.now();
  if (inMemoryContentCache && now - lastDbFetchTime < CACHE_TTL) {
    return inMemoryContentCache;
  }

  // 1. Try reading from PostgreSQL site_content table
  if (client) {
    try {
      const rows = await client`SELECT id, section, data FROM site_content`;
      if (rows && rows.length > 0) {
        const merged: any = { ...DEFAULT_SITE_CONTENT };
        for (const row of rows) {
          const key = (row.section || row.id) as keyof SiteContentMap;
          if (row.data) {
            merged[key] = {
              ...(DEFAULT_SITE_CONTENT[key] || {}),
              ...row.data,
            };
          }
        }
        inMemoryContentCache = merged as SiteContentMap;
        lastDbFetchTime = now;
        return inMemoryContentCache;
      }
    } catch (err) {
      console.warn('PostgreSQL query note for site_content, using fallback:', err);
    }
  }

  // 2. Fallback to local site-content.json if exists
  ensureDataDir();
  if (fs.existsSync(CONTENT_FILE)) {
    try {
      const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      inMemoryContentCache = {
        ...DEFAULT_SITE_CONTENT,
        ...parsed,
      };
      return inMemoryContentCache!;
    } catch (err) {
      console.warn('Could not read site-content.json, using defaults:', err);
    }
  }

  inMemoryContentCache = { ...DEFAULT_SITE_CONTENT };
  return inMemoryContentCache;
}

export async function getSiteContent<K extends keyof SiteContentMap>(key: K): Promise<SiteContentMap[K]> {
  const all = await getAllSiteContent();
  return all[key] || DEFAULT_SITE_CONTENT[key];
}

export async function updateSiteContent<K extends keyof SiteContentMap>(
  key: K,
  data: Partial<SiteContentMap[K]>
): Promise<SiteContentMap[K]> {
  const all = await getAllSiteContent();
  all[key] = {
    ...all[key],
    ...data,
  };

  inMemoryContentCache = all;
  lastDbFetchTime = Date.now();

  // 1. Persist directly to PostgreSQL site_content table
  if (client) {
    try {
      const payload = JSON.stringify(all[key]);
      await client`
        INSERT INTO site_content (id, section, data, updated_at)
        VALUES (${String(key)}, ${String(key)}, ${payload}::json, NOW())
        ON CONFLICT (id) DO UPDATE
        SET data = ${payload}::json, updated_at = NOW()
      `;
    } catch (err) {
      console.error('Failed saving site_content to PostgreSQL:', err);
    }
  }

  // 2. Also save to local file if writable
  ensureDataDir();
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(all, null, 2), 'utf-8');
  } catch {
    // ignore
  }

  return all[key];
}

export async function resetSiteContent(): Promise<SiteContentMap> {
  inMemoryContentCache = { ...DEFAULT_SITE_CONTENT };
  lastDbFetchTime = Date.now();

  if (client) {
    try {
      for (const section of Object.keys(DEFAULT_SITE_CONTENT) as (keyof SiteContentMap)[]) {
        const payload = JSON.stringify(DEFAULT_SITE_CONTENT[section]);
        await client`
          INSERT INTO site_content (id, section, data, updated_at)
          VALUES (${String(section)}, ${String(section)}, ${payload}::json, NOW())
          ON CONFLICT (id) DO UPDATE
          SET data = ${payload}::json, updated_at = NOW()
        `;
      }
    } catch (err) {
      console.error('Failed resetting site_content in PostgreSQL:', err);
    }
  }

  ensureDataDir();
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(DEFAULT_SITE_CONTENT, null, 2), 'utf-8');
  } catch {
    // ignore
  }

  return inMemoryContentCache;
}
