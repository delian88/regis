import { NextResponse } from 'next/server';
import { db, client } from '@/db';
import * as schema from '@/db/schema';
import { sql } from 'drizzle-orm';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();
  let isConnected = false;
  let dbVersion = '';
  let dbName = '';
  let errorMsg = null;
  let tableCounts: Record<string, number> = {};

  // Check if admin is authenticated
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('regis_admin_session');
  let userEmail = 'vicollins2003@gmail.com';
  let isAuthenticated = false;

  if (sessionCookie?.value) {
    try {
      const parsed = JSON.parse(sessionCookie.value);
      userEmail = parsed.email || userEmail;
      isAuthenticated = true;
    } catch {
      // ignore
    }
  }

  if (db && client) {
    try {
      // 1. Ping DB and get version
      const pingResult = await client`SELECT current_database(), version()`;
      if (pingResult && pingResult.length > 0) {
        isConnected = true;
        dbName = pingResult[0].current_database || 'postgres';
        dbVersion = pingResult[0].version ? pingResult[0].version.split(' ')[0] + ' ' + pingResult[0].version.split(' ')[1] : 'PostgreSQL 17';
      }

      // 2. Query table counts
      const [propsCount] = await client`SELECT count(*) FROM properties`;
      const [contentCount] = await client`SELECT count(*) FROM site_content`;
      const [bookingsCount] = await client`SELECT count(*) FROM inspection_bookings`;
      const [adminsCount] = await client`SELECT count(*) FROM admin_users`;

      tableCounts = {
        properties: Number(propsCount?.count || 0),
        site_content: Number(contentCount?.count || 0),
        inspection_bookings: Number(bookingsCount?.count || 0),
        admin_users: Number(adminsCount?.count || 0),
      };
    } catch (err: unknown) {
      isConnected = false;
      errorMsg = err instanceof Error ? err.message : String(err);
      console.error('Database status check failed:', err);
    }
  } else {
    errorMsg = 'Database client not initialized';
  }

  const latencyMs = Date.now() - startTime;

  return NextResponse.json({
    success: isConnected,
    database: {
      status: isConnected ? 'connected' : 'disconnected',
      connected: isConnected,
      name: dbName,
      provider: 'Supabase PostgreSQL Cloud',
      host: 'aws-0-us-east-1.pooler.supabase.com',
      ssl: true,
      latencyMs,
      version: dbVersion,
      error: errorMsg,
    },
    tables: tableCounts,
    superadmin: {
      email: userEmail,
      role: 'superadmin',
      authenticated: isAuthenticated,
    },
    timestamp: new Date().toISOString(),
  });
}
