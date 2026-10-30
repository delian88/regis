import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { SEED_PROPERTIES, SEED_AGENTS, SEED_REQUESTS, SeedProperty, SeedAgent, SeedPropertyRequest } from './seed-data';

const connectionString = process.env.DATABASE_URL || '';

// Singleton database instance
export const client = connectionString && !connectionString.includes('sample_password')
  ? postgres(connectionString, { prepare: false })
  : null;

export const db = client ? drizzle(client, { schema }) : null;

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
  limit?: number;
}): Promise<(SeedProperty & { agent?: SeedAgent })[]> {
  try {
    if (db) {
      // Query database if available
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

  // Graceful fallback to rich seed data
  let list = [...SEED_PROPERTIES];

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

  if (filter?.limit && filter.limit > 0) {
    list = list.slice(0, filter.limit);
  }

  return list.map((property) => ({
    ...property,
    agent: SEED_AGENTS.find((a) => a.id === property.agentId),
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

  const prop = SEED_PROPERTIES.find((p) => p.id === numericId || p.slug === String(id));
  if (!prop) return null;

  return {
    ...prop,
    agent: SEED_AGENTS.find((a) => a.id === prop.agentId),
  };
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

