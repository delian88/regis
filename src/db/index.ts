import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import * as schema from './schema';
import { SEED_PROPERTIES, SEED_AGENTS, SEED_REQUESTS, SeedProperty, SeedAgent, SeedPropertyRequest } from './seed-data';

export * from './site-content';

const connectionString = process.env.DATABASE_URL || '';

// Singleton database instance
export const client = connectionString && !connectionString.includes('sample_password')
  ? postgres(connectionString, { prepare: false })
  : null;

export const db = client ? drizzle(client, { schema }) : null;

// Paths for persistent JSON file storage
const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const CUSTOM_PROPS_FILE = path.join(DATA_DIR, 'custom-properties.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'inspection-bookings.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {
      // ignore
    }
  }
}

// In-memory caches for snappy responsiveness
let customPropertiesCache: SeedProperty[] | null = null;

export function getCustomProperties(): SeedProperty[] {
  if (customPropertiesCache) return customPropertiesCache;
  ensureDataDir();
  if (fs.existsSync(CUSTOM_PROPS_FILE)) {
    try {
      const raw = fs.readFileSync(CUSTOM_PROPS_FILE, 'utf-8');
      customPropertiesCache = JSON.parse(raw);
      return customPropertiesCache!;
    } catch (err) {
      console.warn('Failed reading custom-properties.json:', err);
    }
  }
  customPropertiesCache = [];
  return customPropertiesCache;
}

function saveCustomProperties(list: SeedProperty[]) {
  customPropertiesCache = list;
  ensureDataDir();
  try {
    fs.writeFileSync(CUSTOM_PROPS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed writing custom-properties.json:', err);
  }
}

// Inspection Bookings Interface
export interface InspectionBooking {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  propertyInterest: string;
  preferredDate: string;
  message: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

let bookingsCache: InspectionBooking[] | null = null;

export function getInspectionBookings(): InspectionBooking[] {
  if (bookingsCache) return bookingsCache;
  ensureDataDir();
  if (fs.existsSync(BOOKINGS_FILE)) {
    try {
      const raw = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
      bookingsCache = JSON.parse(raw);
      return bookingsCache!;
    } catch (err) {
      console.warn('Failed reading inspection-bookings.json:', err);
    }
  }
  bookingsCache = [
    {
      id: 1,
      fullName: 'Alhaji Musa Danladi',
      email: 'musa.danladi@gmail.com',
      phone: '+234 803 445 9988',
      propertyInterest: 'Guzape 6-Bedroom Luxury Terrace Duplex with Basement',
      preferredDate: '2026-11-05',
      message: 'I want to schedule an executive private walkout basement and penthouse inspection with my family.',
      status: 'pending',
      createdAt: '2026-10-30T10:15:00Z',
    },
    {
      id: 2,
      fullName: 'Dr. Chidinma Okafor',
      email: 'chidinma.okafor@yahoo.com',
      phone: '+234 812 667 4321',
      propertyInterest: '5-Bedroom Semi-Detached Duplex – FHA Mbora',
      preferredDate: '2026-11-08',
      message: 'Interested in FHA Mortgage Bank financing terms and payment milestone schedule.',
      status: 'contacted',
      createdAt: '2026-10-29T14:30:00Z',
    },
    {
      id: 3,
      fullName: 'Engr. Kenneth Adeleke',
      email: 'kadeleke@consultants.ng',
      phone: '+234 805 112 3344',
      propertyInterest: 'Lugbe Serviced Estate Land (500 SQM)',
      preferredDate: '2026-11-10',
      message: 'Would like to verify beacon coordinates and approved architectural building drawings.',
      status: 'scheduled',
      createdAt: '2026-10-28T16:45:00Z',
    },
  ];
  saveBookings(bookingsCache);
  return bookingsCache;
}

function saveBookings(list: InspectionBooking[]) {
  bookingsCache = list;
  ensureDataDir();
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed writing inspection-bookings.json:', err);
  }
}

export function addInspectionBooking(
  item: Omit<InspectionBooking, 'id' | 'createdAt' | 'status'> & { status?: InspectionBooking['status'] }
): InspectionBooking {
  const current = getInspectionBookings();
  const newBooking: InspectionBooking = {
    id: current.length > 0 ? Math.max(...current.map((b) => b.id)) + 1 : 1,
    fullName: item.fullName,
    email: item.email,
    phone: item.phone,
    propertyInterest: item.propertyInterest || 'General Inquiry',
    preferredDate: item.preferredDate || new Date().toISOString().split('T')[0],
    message: item.message || '',
    status: item.status || 'pending',
    createdAt: new Date().toISOString(),
  };
  current.unshift(newBooking);
  saveBookings(current);
  return newBooking;
}

export function updateInspectionBooking(id: number, status: InspectionBooking['status']): InspectionBooking | null {
  const current = getInspectionBookings();
  const index = current.findIndex((b) => b.id === id);
  if (index === -1) return null;
  current[index].status = status;
  saveBookings(current);
  return current[index];
}

// Property and Agent Data Access Helper Layer
export async function getProperties(filter?: {
  category?: string;
  propertyType?: string;
  state?: string;
  locality?: string;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  featuredOnly?: boolean;
  status?: string;
  limit?: number;
}): Promise<(SeedProperty & { agent?: SeedAgent })[]> {
  try {
    if (db) {
      const results = await db.query.properties.findMany({
        with: { agent: true },
        limit: filter?.limit || 50,
      });
      if (results && results.length > 0) {
        return results as unknown as (SeedProperty & { agent?: SeedAgent })[];
      }
    }
  } catch (err) {
    console.warn('Database query fallback to seed memory data:', err);
  }

  // Combine custom properties (created via admin) with default seed properties
  const customProps = getCustomProperties();
  let list = [...customProps, ...SEED_PROPERTIES];

  if (filter?.category && filter.category !== 'all') {
    list = list.filter((p) => p.category.toLowerCase() === filter.category?.toLowerCase());
  }
  if (filter?.propertyType && filter.propertyType !== 'all') {
    list = list.filter((p) => p.propertyType.toLowerCase() === filter.propertyType?.toLowerCase());
  }
  if (filter?.state && filter.state !== 'all') {
    list = list.filter((p) => p.state.toLowerCase() === filter.state?.toLowerCase());
  }
  if (filter?.locality && filter.locality !== 'all') {
    list = list.filter((p) => p.locality.toLowerCase().includes(filter.locality?.toLowerCase() || ''));
  }
  if (filter?.bedrooms && filter.bedrooms > 0) {
    list = list.filter((p) => p.bedrooms >= filter.bedrooms!);
  }
  if (filter?.minPrice && filter.minPrice > 0) {
    list = list.filter((p) => p.price >= filter.minPrice!);
  }
  if (filter?.maxPrice && filter.maxPrice > 0) {
    list = list.filter((p) => p.price <= filter.maxPrice!);
  }
  if (filter?.featuredOnly) {
    list = list.filter((p) => p.isFeatured);
  }
  if (filter?.status && filter.status !== 'all') {
    list = list.filter((p) => p.status === filter.status);
  }

  if (filter?.limit && filter.limit > 0) {
    list = list.slice(0, filter.limit);
  }

  return list.map((property) => ({
    ...property,
    agent: SEED_AGENTS.find((a) => a.id === property.agentId) || SEED_AGENTS[0],
  }));
}

export async function getPropertyById(id: number | string): Promise<(SeedProperty & { agent?: SeedAgent }) | null> {
  const numericId = Number(id);
  try {
    if (db) {
      const item = await db.query.properties.findFirst({
        where: (props, { eq }) => eq(props.id, numericId),
        with: { agent: true },
      });
      if (item) return item as unknown as (SeedProperty & { agent?: SeedAgent });
    }
  } catch (err) {
    console.warn('Database single query fallback to seed memory data:', err);
  }

  const customProps = getCustomProperties();
  const all = [...customProps, ...SEED_PROPERTIES];
  const prop = all.find((p) => p.id === numericId || p.slug === String(id));
  if (!prop) return null;

  return {
    ...prop,
    agent: SEED_AGENTS.find((a) => a.id === prop.agentId) || SEED_AGENTS[0],
  };
}

// Admin Property CRUD Operations
export async function createProperty(data: Omit<SeedProperty, 'id' | 'createdAt'>): Promise<SeedProperty> {
  const custom = getCustomProperties();
  const maxId = Math.max(
    5000,
    ...custom.map((p) => p.id),
    ...SEED_PROPERTIES.map((p) => p.id)
  );

  const newProperty: SeedProperty = {
    ...data,
    id: maxId + 1,
    slug:
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    createdAt: new Date().toISOString(),
    agentId: data.agentId || 1, // Regis Integrated Services Limited
    status: data.status || 'available',
    images: data.images && data.images.length > 0 ? data.images : ['https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg'],
    videos: data.videos || (data.videoUrl ? [data.videoUrl] : []),
  };

  custom.unshift(newProperty);
  saveCustomProperties(custom);

  // If DB is connected, insert into Postgres as well
  if (db) {
    try {
      await db.insert(schema.properties).values({
        id: newProperty.id,
        title: newProperty.title,
        slug: newProperty.slug,
        description: newProperty.description,
        category: newProperty.category,
        propertyType: newProperty.propertyType,
        subtype: newProperty.subtype,
        price: newProperty.price,
        currency: newProperty.currency,
        period: newProperty.period,
        state: newProperty.state,
        locality: newProperty.locality,
        area: newProperty.area,
        streetAddress: newProperty.streetAddress,
        bedrooms: newProperty.bedrooms,
        bathrooms: newProperty.bathrooms,
        toilets: newProperty.toilets,
        parkingSpaces: newProperty.parkingSpaces,
        plotSizeSqm: newProperty.plotSizeSqm,
        isFurnished: newProperty.isFurnished,
        isServiced: newProperty.isServiced,
        isShared: newProperty.isShared,
        isFeatured: newProperty.isFeatured,
        isVerified: newProperty.isVerified,
        status: newProperty.status,
        images: newProperty.images,
        videoUrl: newProperty.videoUrl || null,
        videos: newProperty.videos || [],
        amenities: newProperty.amenities,
        agentId: newProperty.agentId,
      });
    } catch (err) {
      console.warn('Error syncing new property to DB:', err);
    }
  }

  return newProperty;
}

export async function updateProperty(id: number | string, data: Partial<SeedProperty>): Promise<SeedProperty | null> {
  const numericId = Number(id);
  const custom = getCustomProperties();
  const customIndex = custom.findIndex((p) => p.id === numericId || p.slug === String(id));

  if (customIndex !== -1) {
    custom[customIndex] = {
      ...custom[customIndex],
      ...data,
      videos: data.videos || (data.videoUrl ? [data.videoUrl] : custom[customIndex].videos),
    };
    saveCustomProperties(custom);
    return custom[customIndex];
  }

  // If modifying a seed property, create an overridden version in custom
  const seedItem = SEED_PROPERTIES.find((p) => p.id === numericId || p.slug === String(id));
  if (seedItem) {
    const updated: SeedProperty = {
      ...seedItem,
      ...data,
      videos: data.videos || (data.videoUrl ? [data.videoUrl] : seedItem.videos),
    };
    custom.unshift(updated);
    saveCustomProperties(custom);
    return updated;
  }

  return null;
}

export async function deleteProperty(id: number | string): Promise<boolean> {
  const numericId = Number(id);
  const custom = getCustomProperties();
  const index = custom.findIndex((p) => p.id === numericId || p.slug === String(id));

  if (index !== -1) {
    custom.splice(index, 1);
    saveCustomProperties(custom);
    return true;
  }

  return false;
}

export async function getAgents(): Promise<SeedAgent[]> {
  try {
    if (db) {
      const items = await db.query.agents.findMany();
      if (items && items.length > 0) return items as unknown as SeedAgent[];
    }
  } catch (err) {
    console.warn('Agents query fallback:', err);
  }
  return SEED_AGENTS;
}

export async function getAgentById(id: number | string): Promise<SeedAgent | null> {
  const numericId = Number(id);
  const agent = SEED_AGENTS.find((a) => a.id === numericId || a.slug === String(id));
  return agent || null;
}

export async function getPropertyRequests(filter?: {
  requestType?: string;
  propertyType?: string;
  state?: string;
  limit?: number;
}): Promise<SeedPropertyRequest[]> {
  try {
    if (db) {
      const items = await db.query.propertyRequests.findMany({
        limit: filter?.limit || 50,
      });
      if (items && items.length > 0) return items as unknown as SeedPropertyRequest[];
    }
  } catch (err) {
    console.warn('Property requests query fallback:', err);
  }

  let list = [...SEED_REQUESTS];
  if (filter?.requestType && filter.requestType !== 'all') {
    list = list.filter((r) => r.requestType.toLowerCase() === filter.requestType?.toLowerCase());
  }
  if (filter?.propertyType && filter.propertyType !== 'all') {
    list = list.filter((r) => r.propertyType.toLowerCase() === filter.propertyType?.toLowerCase());
  }
  if (filter?.state && filter.state !== 'all') {
    list = list.filter((r) => r.state.toLowerCase() === filter.state?.toLowerCase());
  }
  if (filter?.limit && filter.limit > 0) {
    list = list.slice(0, filter.limit);
  }
  return list;
}

export async function addPropertyRequest(item: Omit<SeedPropertyRequest, 'id' | 'createdAt' | 'status'> & { status?: string }) {
  const newEntry: SeedPropertyRequest = {
    id: SEED_REQUESTS.length + 1,
    name: item.name,
    email: item.email,
    phone: item.phone,
    requestType: item.requestType,
    propertyType: item.propertyType,
    state: item.state,
    locality: item.locality || '',
    bedrooms: item.bedrooms || 0,
    budgetMin: item.budgetMin || null,
    budgetMax: item.budgetMax || null,
    details: item.details || '',
    status: item.status || 'active',
    createdAt: new Date().toISOString(),
  };

  SEED_REQUESTS.unshift(newEntry);
  return newEntry;
}
