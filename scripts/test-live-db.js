async function testLive() {
  console.log('Testing Live Vercel APIs (https://regis-ruby.vercel.app)...');

  // Test 1: Public properties endpoint
  try {
    const res = await fetch('https://regis-ruby.vercel.app/api/properties');
    const data = await res.json();
    console.log('1. /api/properties status:', res.status, 'Total items:', Array.isArray(data) ? data.length : data?.data?.length || 'not array');
  } catch (err) {
    console.error('1. /api/properties error:', err.message);
  }

  // Test 2: Admin Auth status check (GET)
  try {
    const res = await fetch('https://regis-ruby.vercel.app/api/admin/auth');
    console.log('2. /api/admin/auth GET status (unauthenticated):', res.status);
  } catch (err) {
    console.error('2. /api/admin/auth error:', err.message);
  }

  // Test 3: Admin Auth POST login
  let cookie = '';
  try {
    const res = await fetch('https://regis-ruby.vercel.app/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'vicollins2003@gmail.com',
        password: 'Admin@regis$1'
      })
    });
    const setCookie = res.headers.get('set-cookie');
    const data = await res.json();
    console.log('3. /api/admin/auth POST login status:', res.status, 'data:', data);
    if (setCookie) {
      cookie = setCookie.split(';')[0];
      console.log('Got session cookie:', cookie.substring(0, 35) + '...');
    }
  } catch (err) {
    console.error('3. /api/admin/auth POST error:', err.message);
  }

  // Test 4: If authenticated, test admin content API
  if (cookie) {
    try {
      const res = await fetch('https://regis-ruby.vercel.app/api/admin/content', {
        headers: { Cookie: cookie }
      });
      const data = await res.json();
      console.log('4. /api/admin/content status:', res.status, 'keys:', Object.keys(data || {}));
    } catch (err) {
      console.error('4. /api/admin/content error:', err.message);
    }

    try {
      const res = await fetch('https://regis-ruby.vercel.app/api/admin/properties', {
        headers: { Cookie: cookie }
      });
      const data = await res.json();
      console.log('5. /api/admin/properties status:', res.status, 'count:', Array.isArray(data) ? data.length : data?.data?.length);
    } catch (err) {
      console.error('5. /api/admin/properties error:', err.message);
    }

    try {
      const res = await fetch('https://regis-ruby.vercel.app/api/admin/inquiries', {
        headers: { Cookie: cookie }
      });
      const data = await res.json();
      console.log('6. /api/admin/inquiries status:', res.status, 'count:', Array.isArray(data) ? data.length : data?.length);
    } catch (err) {
      console.error('6. /api/admin/inquiries error:', err.message);
    }
  }
}

testLive();
