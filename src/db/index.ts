import fs from 'fs';
import path from 'path';
import { eq, desc, and, gte, lte } from 'drizzle-orm';
import { client, db, DEFAULT_DB_URL } from './connection';
import * as schema from './schema';
import {
  SEED_PROPERTIES,
  SEED_AGENTS,
  SEED_REQUESTS,
  SeedProperty,
  SeedAgent,
  SeedPropertyRequest,
} from './seed-data';

export * from './connection';
export * from './site-content';

// Paths for fallback JSON file storage in case of network interruption
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
  } catch {
    // ignore
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

const DEFAULT_BOOKINGS: InspectionBooking[] = [
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

let bookingsCache: InspectionBooking[] | null = null;

export async function getInspectionBookings(): Promise<InspectionBooking[]> {
  // 1. Fetch directly from PostgreSQL inspection_bookings table
  if (client) {
    try {
      const rows = await client`
        SELECT id, full_name, email, phone, property_interest, preferred_date, message, status, created_at
        FROM inspection_bookings
        ORDER BY id DESC
      `;
      if (rows && rows.length > 0) {
        bookingsCache = rows.map((r: any) => ({
          id: Number(r.id),
          fullName: r.full_name || '',
          email: r.email || '',
          phone: r.phone || '',
          propertyInterest: r.property_interest || 'General Inquiry',
          preferredDate: r.preferred_date || '',
          message: r.message || '',
          status: (r.status as InspectionBooking['status']) || 'pending',
          createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
        }));
        return bookingsCache;
      }
    } catch (err) {
      console.warn('PostgreSQL inspection_bookings query note, falling back:', err);
    }
  }

  // 2. Fallback to local file or memory
  if (bookingsCache) return bookingsCache;
  ensureDataDir();
  if (fs.existsSync(BOOKINGS_FILE)) {
    try {
      const raw = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
      bookingsCache = JSON.parse(raw);
      return bookingsCache!;
    } catch {
      // ignore
    }
  }
  bookingsCache = [...DEFAULT_BOOKINGS];
  return bookingsCache;
}

export async function addInspectionBooking(
  item: Omit<InspectionBooking, 'id' | 'createdAt' | 'status'> & { status?: InspectionBooking['status'] }
): Promise<InspectionBooking> {
  const preferredDate = item.preferredDate || new Date().toISOString().split('T')[0];
  const status = item.status || 'pending';
  const message = item.message || '';
  const propertyInterest = item.propertyInterest || 'General Inquiry';

  // 1. Insert directly into PostgreSQL inspection_bookings table
  if (client) {
    try {
      const [inserted] = await client`
        INSERT INTO inspection_bookings (
          full_name, email, phone, property_interest, preferred_date, message, status, created_at
        ) VALUES (
          ${item.fullName}, ${item.email || ''}, ${item.phone}, ${propertyInterest}, ${preferredDate}, ${message}, ${status}, NOW()
        ) RETURNING id, full_name, email, phone, property_interest, preferred_date, message, status, created_at
      `;
      if (inserted) {
        const created: InspectionBooking = {
          id: Number(inserted.id),
          fullName: inserted.full_name,
          email: inserted.email,
          phone: inserted.phone,
          propertyInterest: inserted.property_interest,
          preferredDate: inserted.preferred_date,
          message: inserted.message,
          status: inserted.status as any,
          createdAt: new Date(inserted.created_at).toISOString(),
        };
        if (bookingsCache) bookingsCache.unshift(created);
        return created;
      }
    } catch (err) {
      console.error('Failed inserting booking to PostgreSQL:', err);
    }
  }

  // 2. Fallback in-memory
  const current = bookingsCache || DEFAULT_BOOKINGS;
  const newBooking: InspectionBooking = {
    id: current.length > 0 ? Math.max(...current.map((b) => b.id)) + 1 : 1,
    fullName: item.fullName,
    email: item.email || '',
    phone: item.phone,
    propertyInterest,
    preferredDate,
    message,
    status,
    createdAt: new Date().toISOString(),
  };
  current.unshift(newBooking);
  bookingsCache = current;
  ensureDataDir();
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(current, null, 2), 'utf-8');
  } catch {
    // ignore
  }
  return newBooking;
}

export async function updateInspectionBooking(
  id: number,
  status: InspectionBooking['status']
): Promise<InspectionBooking | null> {
  if (client) {
    try {
      const [updated] = await client`
        UPDATE inspection_bookings
        SET status = ${status}
        WHERE id = ${id}
        RETURNING id, full_name, email, phone, property_interest, preferred_date, message, status, created_at
      `;
      if (updated) {
        const mapped: InspectionBooking = {
          id: Number(updated.id),
          fullName: updated.full_name,
          email: updated.email,
          phone: updated.phone,
          propertyInterest: updated.property_interest,
          preferredDate: updated.preferred_date,
          message: updated.message,
          status: updated.status as any,
          createdAt: new Date(updated.created_at).toISOString(),
        };
        if (bookingsCache) {
          const idx = bookingsCache.findIndex((b) => b.id === id);
          if (idx !== -1) bookingsCache[idx] = mapped;
        }
        return mapped;
      }
    } catch (err) {
      console.error('Failed updating inspection_booking in PostgreSQL:', err);
    }
  }

  const current = bookingsCache || DEFAULT_BOOKINGS;
  const index = current.findIndex((b) => b.id === id);
  if (index === -1) return null;
  current[index].status = status;
  bookingsCache = current;
  return current[index];
}

export async function deleteInspectionBooking(id: number): Promise<boolean> {
  if (client) {
    try {
      await client`DELETE FROM inspection_bookings WHERE id = ${id}`;
      if (bookingsCache) {
        bookingsCache = bookingsCache.filter((b) => b.id !== id);
      }
      return true;
    } catch (err) {
      console.error('Failed deleting inspection_booking in PostgreSQL:', err);
    }
  }

  if (bookingsCache) {
    bookingsCache = bookingsCache.filter((b) => b.id !== id);
  }
  return true;
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
    if (client) {
      // Query directly from PostgreSQL properties table
      const rows = await client`
        SELECT 
          p.id, p.title, p.slug, p.description, p.category, p.property_type, p.subtype,
          p.price, p.currency, p.period, p.state, p.locality, p.area, p.street_address,
          p.bedrooms, p.bathrooms, p.toilets, p.parking_spaces, p.plot_size_sqm,
          p.is_furnished, p.is_serviced, p.is_shared, p.is_featured, p.is_verified,
          p.status, p.images, p.video_url, p.videos, p.amenities, p.agent_id, p.created_at,
          a.name as agent_name, a.company_name as agent_company, a.phone as agent_phone,
          a.whatsapp as agent_whatsapp, a.email as agent_email, a.logo_url as agent_logo
        FROM properties p
        LEFT JOIN agents a ON p.agent_id = a.id
        ORDER BY p.id DESC
      `;

      if (rows && rows.length > 0) {
        let list: (SeedProperty & { agent?: SeedAgent })[] = rows.map((r: any) => ({
          id: Number(r.id),
          title: r.title,
          slug: r.slug,
          description: r.description,
          category: r.category,
          propertyType: r.property_type,
          subtype: r.subtype,
          price: Number(r.price),
          currency: r.currency || 'NGN',
          period: r.period || null,
          state: r.state,
          locality: r.locality,
          area: r.area || '',
          streetAddress: r.street_address || '',
          bedrooms: Number(r.bedrooms || 0),
          bathrooms: Number(r.bathrooms || 0),
          toilets: Number(r.toilets || 0),
          parkingSpaces: Number(r.parking_spaces || 0),
          plotSizeSqm: r.plot_size_sqm ? Number(r.plot_size_sqm) : null,
          isFurnished: Boolean(r.is_furnished),
          isServiced: Boolean(r.is_serviced),
          isShared: Boolean(r.is_shared),
          isFeatured: Boolean(r.is_featured),
          isVerified: Boolean(r.is_verified),
          status: r.status || 'available',
          images: Array.isArray(r.images) ? r.images : (typeof r.images === 'string' ? JSON.parse(r.images) : []),
          videoUrl: r.video_url || null,
          videos: Array.isArray(r.videos) ? r.videos : (typeof r.videos === 'string' ? JSON.parse(r.videos) : []),
          amenities: Array.isArray(r.amenities) ? r.amenities : (typeof r.amenities === 'string' ? JSON.parse(r.amenities) : []),
          agentId: r.agent_id ? Number(r.agent_id) : 1,
          createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
          agent: r.agent_name
            ? {
                id: Number(r.agent_id || 1),
                name: r.agent_name,
                companyName: r.agent_company || 'Regis Integrated Services Limited',
                slug: 'regis-integrated-services',
                logoUrl: r.agent_logo || 'https://www.regis.com.ng/wp-content/uploads/2023/10/REGISlogo.jpg',
                phone: r.agent_phone || '+234 815 555 5168',
                whatsapp: r.agent_whatsapp || '2348155555168',
                email: r.agent_email || 'info@regis.com.ng',
                location: 'Wuse Zone 2, Abuja',
                isVerified: true,
                agentType: 'developer',
                activeListingsCount: rows.length,
              }
            : SEED_AGENTS[0],
        }));

        // Apply filters
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

        return list;
      }
    }
  } catch (err) {
    console.warn('Database properties query note, falling back to seed data:', err);
  }

  // Fallback to seed memory data
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

  if (client) {
    try {
      const rows = isNaN(numericId)
        ? await client`SELECT * FROM properties WHERE slug = ${String(id)} LIMIT 1`
        : await client`SELECT * FROM properties WHERE id = ${numericId} OR slug = ${String(id)} LIMIT 1`;

      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          id: Number(r.id),
          title: r.title,
          slug: r.slug,
          description: r.description,
          category: r.category,
          propertyType: r.property_type,
          subtype: r.subtype,
          price: Number(r.price),
          currency: r.currency || 'NGN',
          period: r.period || null,
          state: r.state,
          locality: r.locality,
          area: r.area || '',
          streetAddress: r.street_address || '',
          bedrooms: Number(r.bedrooms || 0),
          bathrooms: Number(r.bathrooms || 0),
          toilets: Number(r.toilets || 0),
          parkingSpaces: Number(r.parking_spaces || 0),
          plotSizeSqm: r.plot_size_sqm ? Number(r.plot_size_sqm) : null,
          isFurnished: Boolean(r.is_furnished),
          isServiced: Boolean(r.is_serviced),
          isShared: Boolean(r.is_shared),
          isFeatured: Boolean(r.is_featured),
          isVerified: Boolean(r.is_verified),
          status: r.status || 'available',
          images: Array.isArray(r.images) ? r.images : (typeof r.images === 'string' ? JSON.parse(r.images) : []),
          videoUrl: r.video_url || null,
          videos: Array.isArray(r.videos) ? r.videos : (typeof r.videos === 'string' ? JSON.parse(r.videos) : []),
          amenities: Array.isArray(r.amenities) ? r.amenities : (typeof r.amenities === 'string' ? JSON.parse(r.amenities) : []),
          agentId: r.agent_id ? Number(r.agent_id) : 1,
          createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
          agent: SEED_AGENTS[0],
        };
      }
    } catch (err) {
      console.warn('PostgreSQL single property query note, falling back:', err);
    }
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

// Admin Property CRUD Operations directly interacting with PostgreSQL
export async function createProperty(data: Omit<SeedProperty, 'id' | 'createdAt'>): Promise<SeedProperty> {
  const slug =
    data.slug ||
    data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const imagesJson = JSON.stringify(data.images && data.images.length > 0 ? data.images : ['https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg']);
  const videosJson = JSON.stringify(data.videos || (data.videoUrl ? [data.videoUrl] : []));
  const amenitiesJson = JSON.stringify(data.amenities || []);

  if (client) {
    try {
      const [inserted] = await client`
        INSERT INTO properties (
          title, slug, description, category, property_type, subtype, price, currency,
          period, state, locality, area, street_address, bedrooms, bathrooms, toilets,
          parking_spaces, plot_size_sqm, is_furnished, is_serviced, is_shared, is_featured,
          is_verified, status, images, video_url, videos, amenities, agent_id, created_at, updated_at
        ) VALUES (
          ${data.title}, ${slug}, ${data.description || ''}, ${data.category}, ${data.propertyType},
          ${data.subtype}, ${data.price}, ${data.currency || 'NGN'}, ${data.period || null},
          ${data.state}, ${data.locality}, ${data.area || ''}, ${data.streetAddress || ''},
          ${data.bedrooms || 0}, ${data.bathrooms || 0}, ${data.toilets || 0}, ${data.parkingSpaces || 0},
          ${data.plotSizeSqm || null}, ${Boolean(data.isFurnished)}, ${Boolean(data.isServiced)},
          ${Boolean(data.isShared)}, ${Boolean(data.isFeatured)}, true, ${data.status || 'available'},
          ${imagesJson}::json, ${data.videoUrl || null}, ${videosJson}::json, ${amenitiesJson}::json,
          ${data.agentId || 1}, NOW(), NOW()
        ) RETURNING id, title, slug, created_at
      `;

      if (inserted) {
        return {
          ...data,
          id: Number(inserted.id),
          slug: inserted.slug,
          createdAt: new Date(inserted.created_at).toISOString(),
          images: JSON.parse(imagesJson),
          videos: JSON.parse(videosJson),
          amenities: JSON.parse(amenitiesJson),
        };
      }
    } catch (err) {
      console.error('Failed inserting property to PostgreSQL:', err);
    }
  }

  // In-memory fallback
  const custom = getCustomProperties();
  const maxId = Math.max(5000, ...custom.map((p) => p.id), ...SEED_PROPERTIES.map((p) => p.id));
  const newProperty: SeedProperty = {
    ...data,
    id: maxId + 1,
    slug,
    createdAt: new Date().toISOString(),
    agentId: data.agentId || 1,
    status: data.status || 'available',
    images: JSON.parse(imagesJson),
    videos: JSON.parse(videosJson),
  };
  custom.unshift(newProperty);
  saveCustomProperties(custom);
  return newProperty;
}

export async function updateProperty(id: number | string, data: Partial<SeedProperty>): Promise<SeedProperty | null> {
  const numericId = Number(id);

  if (client && !isNaN(numericId)) {
    try {
      const [existing] = await client`SELECT * FROM properties WHERE id = ${numericId} LIMIT 1`;
      if (existing) {
        const title = data.title !== undefined ? data.title : existing.title;
        const slug = data.slug !== undefined ? data.slug : existing.slug;
        const description = data.description !== undefined ? data.description : existing.description;
        const category = data.category !== undefined ? data.category : existing.category;
        const propertyType = data.propertyType !== undefined ? data.propertyType : existing.property_type;
        const subtype = data.subtype !== undefined ? data.subtype : existing.subtype;
        const price = data.price !== undefined ? data.price : existing.price;
        const currency = data.currency !== undefined ? data.currency : existing.currency;
        const period = data.period !== undefined ? data.period : existing.period;
        const state = data.state !== undefined ? data.state : existing.state;
        const locality = data.locality !== undefined ? data.locality : existing.locality;
        const area = data.area !== undefined ? data.area : existing.area;
        const streetAddress = data.streetAddress !== undefined ? data.streetAddress : existing.street_address;
        const bedrooms = data.bedrooms !== undefined ? data.bedrooms : existing.bedrooms;
        const bathrooms = data.bathrooms !== undefined ? data.bathrooms : existing.bathrooms;
        const toilets = data.toilets !== undefined ? data.toilets : existing.toilets;
        const parkingSpaces = data.parkingSpaces !== undefined ? data.parkingSpaces : existing.parking_spaces;
        const plotSizeSqm = data.plotSizeSqm !== undefined ? data.plotSizeSqm : existing.plot_size_sqm;
        const isFurnished = data.isFurnished !== undefined ? Boolean(data.isFurnished) : existing.is_furnished;
        const isServiced = data.isServiced !== undefined ? Boolean(data.isServiced) : existing.is_serviced;
        const isFeatured = data.isFeatured !== undefined ? Boolean(data.isFeatured) : existing.is_featured;
        const status = data.status !== undefined ? data.status : existing.status;
        const imagesJson = data.images ? JSON.stringify(data.images) : JSON.stringify(existing.images);
        const videoUrl = data.videoUrl !== undefined ? data.videoUrl : existing.video_url;
        const videosJson = data.videos ? JSON.stringify(data.videos) : JSON.stringify(existing.videos);
        const amenitiesJson = data.amenities ? JSON.stringify(data.amenities) : JSON.stringify(existing.amenities);

        const [updated] = await client`
          UPDATE properties SET
            title = ${title}, slug = ${slug}, description = ${description}, category = ${category},
            property_type = ${propertyType}, subtype = ${subtype}, price = ${price}, currency = ${currency},
            period = ${period}, state = ${state}, locality = ${locality}, area = ${area},
            street_address = ${streetAddress}, bedrooms = ${bedrooms}, bathrooms = ${bathrooms},
            toilets = ${toilets}, parking_spaces = ${parkingSpaces}, plot_size_sqm = ${plotSizeSqm},
            is_furnished = ${isFurnished}, is_serviced = ${isServiced}, is_featured = ${isFeatured},
            status = ${status}, images = ${imagesJson}::json, video_url = ${videoUrl},
            videos = ${videosJson}::json, amenities = ${amenitiesJson}::json, updated_at = NOW()
          WHERE id = ${numericId}
          RETURNING *
        `;

        if (updated) {
          return {
            id: Number(updated.id),
            title: updated.title,
            slug: updated.slug,
            description: updated.description,
            category: updated.category,
            propertyType: updated.property_type,
            subtype: updated.subtype,
            price: Number(updated.price),
            currency: updated.currency,
            period: updated.period,
            state: updated.state,
            locality: updated.locality,
            area: updated.area || '',
            streetAddress: updated.street_address || '',
            bedrooms: Number(updated.bedrooms || 0),
            bathrooms: Number(updated.bathrooms || 0),
            toilets: Number(updated.toilets || 0),
            parkingSpaces: Number(updated.parking_spaces || 0),
            plotSizeSqm: updated.plot_size_sqm ? Number(updated.plot_size_sqm) : null,
            isFurnished: Boolean(updated.is_furnished),
            isServiced: Boolean(updated.is_serviced),
            isShared: Boolean(updated.is_shared),
            isFeatured: Boolean(updated.is_featured),
            isVerified: Boolean(updated.is_verified),
            status: updated.status,
            images: Array.isArray(updated.images) ? updated.images : (typeof updated.images === 'string' ? JSON.parse(updated.images) : []),
            videoUrl: updated.video_url,
            videos: Array.isArray(updated.videos) ? updated.videos : (typeof updated.videos === 'string' ? JSON.parse(updated.videos) : []),
            amenities: Array.isArray(updated.amenities) ? updated.amenities : (typeof updated.amenities === 'string' ? JSON.parse(updated.amenities) : []),
            agentId: updated.agent_id ? Number(updated.agent_id) : 1,
            createdAt: new Date(updated.created_at).toISOString(),
          };
        }
      }
    } catch (err) {
      console.error('Failed updating property in PostgreSQL:', err);
    }
  }

  // Fallback in-memory
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

  return null;
}

export async function deleteProperty(id: number | string): Promise<boolean> {
  const numericId = Number(id);
  if (client && !isNaN(numericId)) {
    try {
      await client`DELETE FROM properties WHERE id = ${numericId}`;
      const custom = getCustomProperties();
      const index = custom.findIndex((p) => p.id === numericId);
      if (index !== -1) {
        custom.splice(index, 1);
        saveCustomProperties(custom);
      }
      return true;
    } catch (err) {
      console.error('Failed deleting property in PostgreSQL:', err);
    }
  }

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
  if (client) {
    try {
      const rows = await client`SELECT * FROM agents`;
      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          id: Number(r.id),
          name: r.name,
          companyName: r.company_name,
          slug: r.slug,
          logoUrl: r.logo_url,
          phone: r.phone,
          whatsapp: r.whatsapp,
          email: r.email || '',
          location: r.location,
          isVerified: Boolean(r.is_verified),
          agentType: r.agent_type,
          activeListingsCount: Number(r.active_listings_count || 1),
        }));
      }
    } catch (err) {
      console.warn('PostgreSQL agents query note, falling back:', err);
    }
  }
  return SEED_AGENTS;
}

export async function getAgentById(id: number | string): Promise<SeedAgent | null> {
  const agents = await getAgents();
  const numericId = Number(id);
  return agents.find((a) => a.id === numericId || a.slug === String(id)) || null;
}

export async function getPropertyRequests(filter?: {
  requestType?: string;
  propertyType?: string;
  state?: string;
  limit?: number;
}): Promise<SeedPropertyRequest[]> {
  if (client) {
    try {
      const rows = await client`SELECT * FROM property_requests ORDER BY id DESC`;
      if (rows && rows.length > 0) {
        let list: SeedPropertyRequest[] = rows.map((r: any) => ({
          id: Number(r.id),
          name: r.name,
          email: r.email,
          phone: r.phone,
          requestType: r.request_type,
          propertyType: r.property_type,
          state: r.state,
          locality: r.locality || '',
          bedrooms: Number(r.bedrooms || 0),
          budgetMin: r.budget_min ? Number(r.budget_min) : null,
          budgetMax: r.budget_max ? Number(r.budget_max) : null,
          details: r.details || '',
          status: r.status,
          createdAt: new Date(r.created_at).toISOString(),
        }));

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
    } catch (err) {
      console.warn('PostgreSQL property_requests query note, falling back:', err);
    }
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

export async function addPropertyRequest(
  item: Omit<SeedPropertyRequest, 'id' | 'createdAt' | 'status'> & { status?: string }
): Promise<SeedPropertyRequest> {
  if (client) {
    try {
      const [inserted] = await client`
        INSERT INTO property_requests (
          name, email, phone, request_type, property_type, state, locality,
          bedrooms, budget_min, budget_max, details, status, created_at
        ) VALUES (
          ${item.name}, ${item.email}, ${item.phone}, ${item.requestType}, ${item.propertyType},
          ${item.state}, ${item.locality || ''}, ${item.bedrooms || 0}, ${item.budgetMin || null},
          ${item.budgetMax || null}, ${item.details || ''}, ${item.status || 'active'}, NOW()
        ) RETURNING *
      `;
      if (inserted) {
        return {
          id: Number(inserted.id),
          name: inserted.name,
          email: inserted.email,
          phone: inserted.phone,
          requestType: inserted.request_type,
          propertyType: inserted.property_type,
          state: inserted.state,
          locality: inserted.locality || '',
          bedrooms: Number(inserted.bedrooms || 0),
          budgetMin: inserted.budget_min ? Number(inserted.budget_min) : null,
          budgetMax: inserted.budget_max ? Number(inserted.budget_max) : null,
          details: inserted.details || '',
          status: inserted.status,
          createdAt: new Date(inserted.created_at).toISOString(),
        };
      }
    } catch (err) {
      console.error('Failed inserting property_request to PostgreSQL:', err);
    }
  }

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
