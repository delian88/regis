const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateAssets() {
  console.log('Generating Regis brand assets & social preview images...');

  // 1. Favicon / Icon SVG (512x512)
  const iconSvg = `
  <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#070B16"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
      <linearGradient id="goldGrad" x1="60" y1="60" x2="452" y2="452" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#FDE68A"/>
        <stop offset="50%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#D97706"/>
      </linearGradient>
      <linearGradient id="amberGlow" x1="256" y1="120" x2="256" y2="392" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
      </linearGradient>
      <filter id="shadow" x="0" y="0" width="512" height="512" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#F59E0B" flood-opacity="0.25"/>
      </filter>
    </defs>

    <!-- Outer Squircle with Gold Border -->
    <rect width="512" height="512" rx="128" fill="url(#bgGrad)"/>
    <rect x="16" y="16" width="480" height="480" rx="112" stroke="url(#goldGrad)" stroke-width="8" stroke-opacity="0.6"/>

    <!-- Subtle Center Glow -->
    <circle cx="256" cy="256" r="160" fill="url(#amberGlow)"/>

    <!-- Golden Architectural Tower & Monogram -->
    <g transform="translate(106, 86)" filter="url(#shadow)">
      <!-- Base Foundation -->
      <path d="M20 290 H280" stroke="url(#goldGrad)" stroke-width="16" stroke-linecap="round"/>
      
      <!-- Central Tower Frame -->
      <path d="M50 290 V70 C50 50 66 34 86 34 H214 C234 34 250 50 250 70 V290" stroke="url(#goldGrad)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      
      <!-- Crown Spire / Architectural Gable -->
      <path d="M50 70 L150 10 L250 70" stroke="url(#goldGrad)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M150 10 V-15" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round"/>

      <!-- Stylized Monogram "R" Window Grid -->
      <!-- Left Vertical Column of windows -->
      <rect x="90" y="80" width="35" height="40" rx="6" fill="url(#goldGrad)"/>
      <rect x="90" y="140" width="35" height="40" rx="6" fill="url(#goldGrad)"/>
      <rect x="90" y="200" width="35" height="45" rx="6" fill="url(#goldGrad)"/>

      <!-- Upper Loop of R -->
      <rect x="145" y="80" width="65" height="40" rx="6" fill="url(#goldGrad)"/>
      <rect x="175" y="140" width="35" height="40" rx="6" fill="url(#goldGrad)"/>

      <!-- Diagonal Stride of R -->
      <path d="M145 180 L205 245" stroke="url(#goldGrad)" stroke-width="20" stroke-linecap="round"/>
    </g>
  </svg>
  `;

  // 2. OpenGraph Social Share Image SVG (1200x630)
  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ogBg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#050811"/>
        <stop offset="50%" stop-color="#0A0F1D"/>
        <stop offset="100%" stop-color="#070B16"/>
      </linearGradient>
      <radialGradient id="ogGlow1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1000 120) rotate(90) scale(400 600)">
        <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="ogGlow2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 500) rotate(90) scale(350 500)">
        <stop offset="0%" stop-color="#D97706" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#D97706" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="ogGold" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#FDE68A"/>
        <stop offset="50%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#D97706"/>
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#ogBg)"/>
    <rect width="1200" height="630" fill="url(#ogGlow1)"/>
    <rect width="1200" height="630" fill="url(#ogGlow2)"/>

    <!-- Outer Decorative Border Frame -->
    <rect x="24" y="24" width="1152" height="582" rx="28" stroke="#1E293B" stroke-width="2"/>
    <rect x="24" y="24" width="1152" height="582" rx="28" stroke="url(#ogGold)" stroke-width="1.5" stroke-opacity="0.3"/>

    <!-- Header Brand Line -->
    <g transform="translate(80, 75)">
      <!-- Logo Emblem Box -->
      <rect width="64" height="64" rx="18" fill="url(#ogGold)"/>
      <g transform="translate(14, 12)">
        <path d="M4 36 H32" stroke="#050811" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M7 36 V10 C7 7 9 5 12 5 H24 C27 5 29 7 29 10 V36" stroke="#050811" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M7 10 L18 2 L29 10" stroke="#050811" stroke-width="3" stroke-linecap="round"/>
        <rect x="12" y="12" width="5" height="6" rx="1" fill="#050811"/>
        <rect x="19" y="12" width="5" height="6" rx="1" fill="#050811"/>
        <rect x="12" y="22" width="5" height="6" rx="1" fill="#050811"/>
        <rect x="19" y="22" width="5" height="6" rx="1" fill="#050811"/>
      </g>

      <!-- Brand Text -->
      <text x="82" y="28" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" letter-spacing="0.5">
        <tspan fill="#F59E0B">REGIS </tspan>INTEGRATED SERVICES LIMITED
      </text>
      <text x="82" y="52" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="12" letter-spacing="2">
        REAL ESTATE DEVELOPMENT &amp; TURNKEY CONSTRUCTION
      </text>
    </g>

    <!-- Main Hero Headline -->
    <g transform="translate(80, 215)">
      <text fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="44" letter-spacing="-0.5">
        Affordable Luxury Real Estate &amp; Construction
      </text>
      <text y="50" fill="#CBD5E1" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="20" letter-spacing="0.2">
        Exclusive master-planned residential estates, luxury terraces, and serviced land in Abuja.
      </text>
    </g>

    <!-- 4 Portfolio Development Pills -->
    <g transform="translate(80, 340)">
      <!-- Pill 1 -->
      <g>
        <rect width="245" height="52" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
        <circle cx="24" cy="26" r="6" fill="#F59E0B"/>
        <text x="40" y="25" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="13">
          Guzape Luxury Terraces
        </text>
        <text x="40" y="41" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="11">
          Cadastral Zone A09, Abuja
        </text>
      </g>

      <!-- Pill 2 -->
      <g transform="translate(260, 0)">
        <rect width="255" height="52" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
        <circle cx="24" cy="26" r="6" fill="#F59E0B"/>
        <text x="40" y="25" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="13">
          FHA Golden Jubilee Estate
        </text>
        <text x="40" y="41" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="11">
          Mbora District, Abuja
        </text>
      </g>

      <!-- Pill 3 -->
      <g transform="translate(530, 0)">
        <rect width="245" height="52" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
        <circle cx="24" cy="26" r="6" fill="#F59E0B"/>
        <text x="40" y="25" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="13">
          Regis Royale Estate
        </text>
        <text x="40" y="41" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="11">
          Gated Villa Community
        </text>
      </g>

      <!-- Pill 4 -->
      <g transform="translate(790, 0)">
        <rect width="245" height="52" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
        <circle cx="24" cy="26" r="6" fill="#F59E0B"/>
        <text x="40" y="25" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="13">
          Serviced Land Schemes
        </text>
        <text x="40" y="41" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="11">
          Lugbe &amp; Idu Corridors
        </text>
      </g>
    </g>

    <!-- Bottom Footer Row -->
    <g transform="translate(80, 485)">
      <!-- Divider -->
      <line x1="0" y1="0" x2="1040" y2="0" stroke="#1E293B" stroke-width="1.5"/>

      <g transform="translate(0, 35)">
        <!-- Official FHA Alliance -->
        <rect width="270" height="38" rx="10" fill="#1E293B" fill-opacity="0.6"/>
        <text x="14" y="24" fill="#E2E8F0" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="12">
          Partner: Federal Housing Authority (FHA)
        </text>

        <!-- Address & Contact -->
        <text x="300" y="24" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="12">
          22 Koforidua St, Wuse Zone 2, Abuja | +234 (0) 815 555 5168
        </text>

        <!-- Domain -->
        <text x="1040" y="24" text-anchor="end" fill="#F59E0B" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="14">
          regis-ruby.vercel.app
        </text>
      </g>
    </g>
  </svg>
  `;

  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'src', 'app');

  // Generate 512x512 icon.png
  const icon512Buffer = await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'icon.png'), icon512Buffer);
  fs.writeFileSync(path.join(appDir, 'icon.png'), icon512Buffer);
  console.log('✓ Created public/icon.png & src/app/icon.png (512x512)');

  // Generate 180x180 apple-icon.png
  const appleIconBuffer = await sharp(Buffer.from(iconSvg))
    .resize(180, 180)
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), appleIconBuffer);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleIconBuffer);
  console.log('✓ Created public/apple-icon.png & src/app/apple-icon.png (180x180)');

  // Generate 48x48 and 32x32 favicon.ico
  const faviconBuffer = await sharp(Buffer.from(iconSvg))
    .resize(48, 48)
    .toFormat('png')
    .toBuffer();

  // Write as ico (PNG format is supported by modern browsers for favicon.ico)
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), faviconBuffer);
  console.log('✓ Created public/favicon.ico & src/app/favicon.ico (48x48)');

  // Generate 1200x630 og-image.jpg (optimized under 200KB for instant WhatsApp loading)
  const ogImageBuffer = await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'og-image.jpg'), ogImageBuffer);
  console.log(`✓ Created public/og-image.jpg (1200x630, ${(ogImageBuffer.length / 1024).toFixed(1)} KB)`);

  // Generate 1200x630 opengraph-image.png for Next.js file-based App Router
  const ogPngBuffer = await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png({ compressionLevel: 8 })
    .toBuffer();

  fs.writeFileSync(path.join(appDir, 'opengraph-image.png'), ogPngBuffer);
  console.log(`✓ Created src/app/opengraph-image.png (1200x630, ${(ogPngBuffer.length / 1024).toFixed(1)} KB)`);

  // Create webmanifest
  const manifest = {
    name: 'Regis Integrated Services Limited',
    short_name: 'Regis Real Estate',
    description: 'Providing Affordable Housing for Deserving Nigerians. Luxury Real Estate Development & Turnkey Construction Abuja.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070B16',
    theme_color: '#F59E0B',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  };

  fs.writeFileSync(path.join(publicDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('✓ Created public/manifest.json');
}

generateAssets().catch((err) => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});
