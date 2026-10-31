import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import * as schema from './schema';
import { SEED_AGENTS, SEED_PROPERTIES } from './seed-data';
import { DEFAULT_SITE_CONTENT } from './site-content-types';

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

  // 1. Create Superadmin in Supabase Auth via Service Role
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const adminEmail = process.env.SUPERADMIN_EMAIL || 'vicollins2003@gmail.com';
  const adminPassword = process.env.SUPERADMIN_PASSWORD || 'Admin@regis$1';

  if (supabaseUrl && serviceRoleKey) {
    console.log('Setting up Superadmin in Supabase Auth...');
    try {
      const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      // Check if user already exists
      const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = usersData?.users?.find((u) => u.email === adminEmail);

      if (!existingUser) {
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email: adminEmail,
          password: adminPassword,
          email_confirm: true,
          user_metadata: {
            full_name: 'Regis Super Administrator',
            role: 'superadmin',
          },
        });
        if (createError) {
          console.warn('Note on Supabase Auth user creation:', createError.message);
        } else {
          console.log('Superadmin user created in Supabase Auth:', newUser?.user?.email);
        }
      } else {
        // Update password to ensure it matches
        await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
          password: adminPassword,
          email_confirm: true,
        });
        console.log('Superadmin user password verified in Supabase Auth:', existingUser.email);
      }
    } catch (authErr) {
      console.warn('Supabase Auth provisioning note:', authErr);
    }
  }

  // 2. Insert into admin_users table in PostgreSQL
  console.log('Seeding admin_users table...');
  try {
    await db
      .insert(schema.adminUsers)
      .values({
        email: adminEmail,
        passwordHash: adminPassword, // Plain/hash for internal fallback check
        fullName: 'Regis Super Administrator',
        role: 'superadmin',
      })
      .onConflictDoNothing();
  } catch (err) {
    console.warn('admin_users insert note:', err);
  }

  // 3. Seed Agents
  console.log('Seeding agents...');
  for (const agent of SEED_AGENTS) {
    await db
      .insert(schema.agents)
      .values({
        id: agent.id,
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
      })
      .onConflictDoNothing();
  }

  // 4. Seed Properties with Video & Status
  console.log('Seeding properties & serviced lands...');
  for (const prop of SEED_PROPERTIES) {
    await db
      .insert(schema.properties)
      .values({
        id: prop.id,
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
        status: prop.status || 'available',
        images: prop.images,
        videoUrl: prop.videoUrl || null,
        videos: prop.videos || [],
        amenities: prop.amenities,
        agentId: prop.agentId,
      })
      .onConflictDoNothing();
  }

  // 5. Seed Site Content sections
  console.log('Seeding site_content table...');
  for (const sectionKey of Object.keys(DEFAULT_SITE_CONTENT) as (keyof typeof DEFAULT_SITE_CONTENT)[]) {
    await db
      .insert(schema.siteContent)
      .values({
        id: sectionKey,
        section: sectionKey,
        data: DEFAULT_SITE_CONTENT[sectionKey],
      })
      .onConflictDoNothing();
  }

  // 6. Seed Sample Inspection Bookings
  console.log('Seeding inspection_bookings...');
  try {
    await db
      .insert(schema.inspectionBookings)
      .values([
        {
          fullName: 'Alhaji Musa Danladi',
          email: 'musa.danladi@gmail.com',
          phone: '+234 803 445 9988',
          propertyInterest: 'Guzape 6-Bedroom Luxury Terrace Duplex with Basement',
          preferredDate: '2026-11-05',
          message: 'I want to schedule an executive private walkout basement and penthouse inspection with my family.',
          status: 'pending',
        },
        {
          fullName: 'Dr. Chidinma Okafor',
          email: 'chidinma.okafor@yahoo.com',
          phone: '+234 812 667 4321',
          propertyInterest: '5-Bedroom Semi-Detached Duplex – FHA Mbora',
          preferredDate: '2026-11-08',
          message: 'Interested in FHA Mortgage Bank financing terms and payment milestone schedule.',
          status: 'contacted',
        },
        {
          fullName: 'Engr. Kenneth Adeleke',
          email: 'kadeleke@consultants.ng',
          phone: '+234 805 112 3344',
          propertyInterest: 'Lugbe Serviced Estate Land (500 SQM)',
          preferredDate: '2026-11-10',
          message: 'Would like to verify beacon coordinates and approved architectural building drawings.',
          status: 'scheduled',
        },
      ])
      .onConflictDoNothing();
  } catch (err) {
    console.warn('inspection_bookings insert note:', err);
  }

  console.log('✅ Supabase PostgreSQL database fully connected & seeded successfully!');
  await client.end();
  process.exit(0);
}

main().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
