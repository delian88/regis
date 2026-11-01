import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const DEFAULT_DB_URL =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  'postgres://postgres.ihqkntzgfgouzihlhcda:gOdf7pOqa8MhfJbA@aws-0-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require';

// Primary PostgreSQL client connection pool
export const client = postgres(DEFAULT_DB_URL, {
  ssl: 'require',
  prepare: false,
  connect_timeout: 15,
  max: 10,
  idle_timeout: 20,
});

// Primary Drizzle ORM instance
export const db = drizzle(client, { schema });
