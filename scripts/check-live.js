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
  
  // Also check if any 'Sparkles' SVG exists in HTML
  const hasSparkleSvg = html.includes('lucide-sparkles') || html.includes('sparkle');
  console.log('Has sparkle reference in live HTML:', hasSparkleSvg);
}

check().catch(console.error);
