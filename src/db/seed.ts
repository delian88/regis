import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from './schema';
import { SEED_AGENTS, SEED_PROPERTIES } from './seed-data';

dotenv.config({ path: '.env.local' });

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString || connectionString.includes('sample_password')) {
    console.error('Please configure your valid Supabase DATABASE_URL in .env.local to seed the database.');
    process.exit(1);
  }

  console.log('Connecting to Supabase PostgreSQL database...');
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client, { schema });

  console.log('Seeding agents...');
  for (const agent of SEED_AGENTS) {
    await db.insert(schema.agents).values({
      name: agent.name,
      companyName: agent.companyName,
      slug: agent.slug,
      logoUrl: agent.logoUrl,
      phone: agent.phone,
      whatsapp: agent.whatsapp,
      email: agent.email,
      location: agent.location,
      isVerified: agent.isVerified,
      agentType: agent.agentType,
      activeListingsCount: agent.activeListingsCount,
    }).onConflictDoNothing();
  }

  console.log('Seeding properties...');
  for (const prop of SEED_PROPERTIES) {
    await db.insert(schema.properties).values({
      title: prop.title,
      slug: prop.slug,
      description: prop.description,
      category: prop.category,
      propertyType: prop.propertyType,
      subtype: prop.subtype,
      price: prop.price,
      currency: prop.currency,
      period: prop.period,
      state: prop.state,
      locality: prop.locality,
      area: prop.area,
      streetAddress: prop.streetAddress,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      toilets: prop.toilets,
      parkingSpaces: prop.parkingSpaces,
      plotSizeSqm: prop.plotSizeSqm,
      isFurnished: prop.isFurnished,
      isServiced: prop.isServiced,
      isShared: prop.isShared,
      isFeatured: prop.isFeatured,
      isVerified: prop.isVerified,
      images: prop.images,
      amenities: prop.amenities,
      agentId: prop.agentId,
    }).onConflictDoNothing();
  }

  console.log('Database seeded successfully!');
  await client.end();
  process.exit(0);
}

main().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
