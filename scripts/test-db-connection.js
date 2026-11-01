const postgresPkg = require('postgres');
const postgres = postgresPkg.default || postgresPkg;
const fs = require('fs');

// Read .env.local
const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

console.log('Testing connection to:', env.POSTGRES_HOST);
console.log('DATABASE_URL starts with:', env.DATABASE_URL ? env.DATABASE_URL.substring(0, 30) + '...' : 'NONE');

// Test direct connection
const sql = postgres(env.DATABASE_URL, { ssl: 'require', connect_timeout: 10 });

async function run() {
  try {
    const res = await sql`SELECT current_database(), current_user, version()`;
    console.log('Database Query Result:', res);
    
    // Check tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Tables found in database:', tables.map(t => t.table_name));

    // Check properties count if table exists
    if (tables.some(t => t.table_name === 'properties')) {
      const propCount = await sql`SELECT count(*) FROM properties`;
      console.log('Total properties in DB:', propCount[0].count);
    }

    // Check site_content if exists
    if (tables.some(t => t.table_name === 'site_content')) {
      const contentCount = await sql`SELECT count(*) FROM site_content`;
      console.log('Total site_content rows in DB:', contentCount[0].count);
    }
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await sql.end();
  }
}

run();
