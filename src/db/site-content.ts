import fs from 'fs';
import path from 'path';
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

export function getAllSiteContent(): SiteContentMap {
  if (inMemoryContentCache) {
    return inMemoryContentCache;
  }

  ensureDataDir();
  if (fs.existsSync(CONTENT_FILE)) {
    try {
      const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // Merge with defaults in case new keys were added
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

export function getSiteContent<K extends keyof SiteContentMap>(key: K): SiteContentMap[K] {
  const all = getAllSiteContent();
  return all[key] || DEFAULT_SITE_CONTENT[key];
}

export function updateSiteContent<K extends keyof SiteContentMap>(
  key: K,
  data: Partial<SiteContentMap[K]>
): SiteContentMap[K] {
  const all = getAllSiteContent();
  all[key] = {
    ...all[key],
    ...data,
  };

  inMemoryContentCache = all;
  ensureDataDir();
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(all, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist site-content.json to disk:', err);
  }

  return all[key];
}

export function resetSiteContent(): SiteContentMap {
  inMemoryContentCache = { ...DEFAULT_SITE_CONTENT };
  ensureDataDir();
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(DEFAULT_SITE_CONTENT, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write default site-content.json:', err);
  }
  return inMemoryContentCache;
}
