async function check() {
  const res = await fetch('https://regis-ruby.vercel.app', { cache: 'no-store' });
  const html = await res.text();
  const title = html.match(/<title>([^<]+)<\/title>/i);
  const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/i);
  const ogDesc = html.match(/<meta property="og:description" content="([^"]+)"/i);
  const ogImage = html.match(/<meta property="og:image"[^>]+content="([^"]+)"/i);
  const twitterCard = html.match(/<meta name="twitter:card" content="([^"]+)"/i);
  const icons = [...html.matchAll(/<link rel="(?:icon|shortcut icon|apple-touch-icon)"[^>]+>/gi)].map(m => m[0]);
  
  console.log('--- LIVE SITE METADATA REPORT ---');
  console.log('Title:', title ? title[1] : 'NOT FOUND');
  console.log('OG Title:', ogTitle ? ogTitle[1] : 'NOT FOUND');
  console.log('OG Description:', ogDesc ? ogDesc[1] : 'NOT FOUND');
  console.log('OG Image:', ogImage ? ogImage[1] : 'NOT FOUND');
  console.log('Twitter Card:', twitterCard ? twitterCard[1] : 'NOT FOUND');
  console.log('Icons found:', icons);
  
  // Check if Admin Login links exist in HTML
  const loginSnippets = [...html.matchAll(/<a[^>]*href="\/admin\/login"[^>]*>([\s\S]*?)<\/a>/gi)].map(m => m[0].replace(/\s+/g, ' '));
  console.log('Login links count:', loginSnippets.length);
  
  // Check admin login page
  const adminLoginRes = await fetch('https://regis-ruby.vercel.app/admin/login', { cache: 'no-store' });
  const adminHtml = await adminLoginRes.text();
  console.log('Live admin/login has "Supabase Auth Protected":', adminHtml.includes('Supabase Auth Protected'));
  console.log('Live admin/login has "Supabase PostgreSQL":', adminHtml.includes('Supabase PostgreSQL'));
  console.log('Live admin/login has "Live DB":', adminHtml.includes('Live DB'));
}

check().catch(console.error);
