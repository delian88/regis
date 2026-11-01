const postgresPkg = require('postgres');
const postgres = postgresPkg.default || postgresPkg;
const fs = require('fs');

const env = Object.fromEntries(
  fs.readFileSync('.env.local', 'utf-8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => {
      const idx = l.indexOf('=');
      return [l.substring(0, idx).trim(), l.substring(idx + 1).trim()];
    })
);

const sql = postgres(env.DATABASE_URL, { ssl: 'require', connect_timeout: 10 });

async function testFull() {
  console.log('Testing full database integration...');

  // 1. Check site_content rows
  const contentRows = await sql`SELECT id, section FROM site_content`;
  console.log('site_content rows in DB:', contentRows.length);

  // 2. Check properties rows
  const propRows = await sql`SELECT id, title, price FROM properties LIMIT 3`;
  console.log('Sample properties from DB:', propRows);

  // 3. Test insert & delete on properties
  const testSlug = 'test-regis-luxury-suite-' + Date.now();
  const [newProp] = await sql`
    INSERT INTO properties (
      title, slug, description, category, property_type, subtype, price, currency,
      state, locality, is_featured, is_verified, status, images, videos, amenities
    ) VALUES (
      'Test Luxury Suite', ${testSlug}, 'Description test', 'sale', 'houses', 'penthouse',
      150000000, 'NGN', 'Abuja', 'Guzape', true, true, 'available', '[]'::json, '[]'::json, '[]'::json
    ) RETURNING id, title, slug
  `;
  console.log('Inserted test property:', newProp);

  const [deletedProp] = await sql`DELETE FROM properties WHERE id = ${newProp.id} RETURNING id`;
  console.log('Deleted test property:', deletedProp);

  // 4. Test insert & delete on inspection_bookings
  const [newBooking] = await sql`
    INSERT INTO inspection_bookings (
      full_name, email, phone, property_interest, preferred_date, message, status
    ) VALUES (
      'Test Client', 'client@test.ng', '+2348000000000', 'Guzape Terraces', '2026-11-15', 'Test booking', 'pending'
    ) RETURNING id, full_name, status
  `;
  console.log('Inserted test booking:', newBooking);

  await sql`DELETE FROM inspection_bookings WHERE id = ${newBooking.id}`;
  console.log('Deleted test booking successfully!');

  console.log('ALL DATABASE INTEGRATION TESTS PASSED 100%!');
  await sql.end();
}

testFull().catch(console.error);
