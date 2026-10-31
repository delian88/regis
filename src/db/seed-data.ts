export interface SeedAgent {
  id: number;
  name: string;
  companyName: string;
  slug: string;
  logoUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  isVerified: boolean;
  agentType: 'agent' | 'developer';
  activeListingsCount: number;
}

export interface SeedProperty {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: 'sale' | 'rent' | 'shortlet' | 'jv';
  propertyType: 'flats' | 'houses' | 'land' | 'commercial';
  subtype: string;
  price: number;
  currency: string;
  period: string | null;
  state: string;
  locality: string;
  area: string;
  streetAddress: string;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  parkingSpaces: number;
  plotSizeSqm: number | null;
  isFurnished: boolean;
  isServiced: boolean;
  isShared: boolean;
  isFeatured: boolean;
  isVerified: boolean;
  status?: 'available' | 'selling_fast' | 'under_construction' | 'sold_out';
  images: string[];
  videoUrl?: string | null;
  videos?: string[];
  amenities: string[];
  agentId: number;
  createdAt: string;
}

export interface SeedPropertyRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  requestType: 'buy' | 'rent' | 'shortlet' | 'jv';
  propertyType: string;
  state: string;
  locality: string;
  bedrooms: number;
  budgetMin: number | null;
  budgetMax: number | null;
  details: string;
  status: string;
  createdAt: string;
}

export const SEED_AGENTS: SeedAgent[] = [
  {
    id: 1,
    name: "Regis Integrated Services Limited",
    companyName: "Regis Integrated Services Limited",
    slug: "regis-integrated-services-limited",
    logoUrl: "https://www.regis.com.ng/wp-content/uploads/2016/07/logoconstruction.png",
    phone: "+2348155555168",
    whatsapp: "2348155555168",
    email: "info@regis.com.ng",
    location: "22 Koforidua Street, Wuse Zone 2, Abuja, Nigeria",
    isVerified: true,
    agentType: "developer",
    activeListingsCount: 350,
  },
  {
    id: 2,
    name: "Starriest Global Properties",
    companyName: "Starriest Global Properties",
    slug: "starriest-global-properties",
    logoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
    phone: "09036650834",
    whatsapp: "2349036650834",
    email: "contact@starriestproperties.com",
    location: "Lekki, Lagos",
    isVerified: true,
    agentType: "agent",
    activeListingsCount: 1840,
  },
  {
    id: 3,
    name: "Prime Haven Real Estate",
    companyName: "Prime Haven Real Estate",
    slug: "prime-haven-real-estate",
    logoUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=256&q=80",
    phone: "08023456789",
    whatsapp: "2348023456789",
    email: "sales@primehaven.ng",
    location: "Maitama, Abuja",
    isVerified: true,
    agentType: "developer",
    activeListingsCount: 924,
  },
  {
    id: 4,
    name: "Apex Crest Realtors",
    companyName: "Apex Crest Realtors",
    slug: "apex-crest-realtors",
    logoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    phone: "08187654321",
    whatsapp: "2348187654321",
    email: "enquiries@apexcrest.ng",
    location: "Victoria Island, Lagos",
    isVerified: true,
    agentType: "agent",
    activeListingsCount: 650,
  }
];

export const SEED_PROPERTIES: SeedProperty[] = [
  {
    id: 1001,
    title: "6 Bedroom Luxury Terrace with Basement, Ground Floor, 1st & 2nd Floor",
    slug: "6-bedroom-luxury-terrace-guzape-district-abuja",
    description: "Luxury duplexes situated at Plot 22 Cadastral Zone A09 Guzape District (Main). It is a luxury 6 bedroom duplex with basement, ground floor, first and second floors. Features panoramic elevated views of Abuja, masterfully finished interiors, dedicated elevator shaft, swimming pool access, and robust perimeter security.",
    category: "sale",
    propertyType: "houses",
    subtype: "terrace",
    price: 500000000,
    currency: "NGN",
    period: null,
    state: "Abuja",
    locality: "Guzape",
    area: "Cadastral Zone A09",
    streetAddress: "Plot 22 Cadastral Zone A09, Guzape District (Main), Abuja",
    bedrooms: 6,
    bathrooms: 6,
    toilets: 7,
    parkingSpaces: 4,
    plotSizeSqm: 650,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://www.regis.com.ng/wp-content/uploads/2024/10/IMG_Photo-11-270x270_c.jpg",
      "https://www.regis.com.ng/wp-content/uploads/2024/10/IMG_Photo-8.jpg",
      "https://www.regis.com.ng/wp-content/uploads/2024/10/3D10_042151.jpg",
      "https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.39.jpeg"
    ],
    amenities: [
      "Basement Floor",
      "Elevator",
      "24/7 Power Supply",
      "Swimming Pool",
      "POP Ceiling",
      "En-suite Bedrooms",
      "CCTV Security",
      "Spacious Balconies",
      "Ample Parking"
    ],
    agentId: 1,
    createdAt: "2026-10-30T10:00:00Z"
  },
  {
    id: 1002,
    title: "5 Bedroom Semi-Detached Duplex – FHA Golden Jubilee Estate",
    slug: "5-bedroom-semi-detached-duplex-mbora-abuja",
    description: "Our 5 Bedroom semi-detached duplex within FHA Golden Jubilee Estate comes with an exquisite design and affords you luxury without breaking your pocket. It is fully detached and is located in the Mbora axis of Abuja with top-tier infrastructure and green spaces.",
    category: "sale",
    propertyType: "houses",
    subtype: "semi-detached-duplex",
    price: 120000000,
    currency: "NGN",
    period: null,
    state: "Abuja",
    locality: "Mbora",
    area: "FHA Golden Jubilee Estate",
    streetAddress: "FHA Golden Jubilee Estate, Mbora, Abuja",
    bedrooms: 5,
    bathrooms: 5,
    toilets: 6,
    parkingSpaces: 3,
    plotSizeSqm: 450,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://www.regis.com.ng/wp-content/uploads/2013/06/Nuga-Best-Regis-Design-8-270x270_c.jpeg",
      "https://www.regis.com.ng/wp-content/uploads/revslider/homepage-slider-1/1_18-Photo.jpg",
      "https://www.regis.com.ng/wp-content/uploads/revslider/homepage-slider-1/1_6-Photo.jpg"
    ],
    amenities: [
      "Fitted Kitchen",
      "All Rooms En-suite",
      "Paved Roads",
      "Street Lighting",
      "24/7 Security Patrol",
      "Prepaid Meter",
      "Central Water Supply"
    ],
    agentId: 1,
    createdAt: "2026-10-30T09:30:00Z"
  },
  {
    id: 1003,
    title: "3 Bedroom Block of Flats – FHA Golden Jubilee Estate",
    slug: "3-bedroom-block-of-flats-mbora-abuja",
    description: "Our 3 Bedroom block of flats within FHA Golden Jubilee Estate comes with an exquisite design and affords you luxury without breaking your pocket. It is located in the prime Mbora axis of Abuja with excellent access to the city center.",
    category: "sale",
    propertyType: "flats",
    subtype: "flat",
    price: 85000000,
    currency: "NGN",
    period: null,
    state: "Abuja",
    locality: "Mbora",
    area: "FHA Golden Jubilee Estate",
    streetAddress: "FHA Golden Jubilee Estate, Mbora, Abuja",
    bedrooms: 3,
    bathrooms: 3,
    toilets: 4,
    parkingSpaces: 2,
    plotSizeSqm: 200,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://www.regis.com.ng/wp-content/uploads/2024/10/3D3_042345-270x270_c.jpg",
      "https://www.regis.com.ng/wp-content/uploads/revslider/homepage-slider-1/3D15_042257.jpg"
    ],
    amenities: [
      "Modern Architectural Design",
      "POP Ceilings",
      "Fitted Wardrobes",
      "Constant Power Supply",
      "Treated Water",
      "Gated Compound"
    ],
    agentId: 1,
    createdAt: "2026-10-29T16:00:00Z"
  },
  {
    id: 1004,
    title: "2 Bedroom Block of Flats – FHA Golden Jubilee Estate",
    slug: "2-bedroom-block-of-flats-mbora-abuja",
    description: "Our 2 Bedroom block of flats within FHA Golden Jubilee Estate comes with an exquisite design and affords you luxury without breaking your pocket. It is located in the Mbora axis of Abuja, offering exceptional rental yields and peace of mind.",
    category: "sale",
    propertyType: "flats",
    subtype: "flat",
    price: 65000000,
    currency: "NGN",
    period: null,
    state: "Abuja",
    locality: "Mbora",
    area: "FHA Golden Jubilee Estate",
    streetAddress: "FHA Golden Jubilee Estate, Mbora, Abuja",
    bedrooms: 2,
    bathrooms: 2,
    toilets: 3,
    parkingSpaces: 2,
    plotSizeSqm: 150,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://www.regis.com.ng/wp-content/uploads/2024/10/3D3_042345-270x270_c.jpg",
      "https://www.regis.com.ng/wp-content/uploads/revslider/homepage-slider-1/1.jpg"
    ],
    amenities: [
      "Quality Finishing",
      "POP Ceiling",
      "Ample Car Parking",
      "Clean Water",
      "Gated Security"
    ],
    agentId: 1,
    createdAt: "2026-10-29T15:00:00Z"
  },
  {
    id: 1005,
    title: "Lugbe Estate Land with Approved Building Designs (500 SQMs)",
    slug: "lugbe-estate-land-approved-building-designs-500sqm",
    description: "Our estate lands available on the site and services model located in Lugbe area comes with Government approved building plans and are located in very suitable table flat ground. Ready for immediate construction.",
    category: "sale",
    propertyType: "land",
    subtype: "residential-land",
    price: 7000000,
    currency: "NGN",
    period: null,
    state: "Abuja",
    locality: "Lugbe",
    area: "Lugbe District",
    streetAddress: "Regis Estate, Lugbe, Airport Road Corridor, Abuja",
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    parkingSpaces: 0,
    plotSizeSqm: 500,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://www.regis.com.ng/wp-content/uploads/2024/10/land-270x270_c.jpg",
      "https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg"
    ],
    amenities: [
      "Approved Building Designs",
      "Site and Services Infrastructure",
      "Table Dry Flat Land",
      "Perimeter Fencing",
      "Easy Airport Road Access"
    ],
    agentId: 1,
    createdAt: "2026-10-28T14:00:00Z"
  },
  {
    id: 1006,
    title: "Lugbe Estate Land with Approved Building Designs (250 SQMs)",
    slug: "lugbe-estate-land-approved-building-designs-250sqm",
    description: "Our estate lands available on the site and services model located in Lugbe comes with Government approved building plans and are located in very suitable table flat ground.",
    category: "sale",
    propertyType: "land",
    subtype: "residential-land",
    price: 3500000,
    currency: "NGN",
    period: null,
    state: "Abuja",
    locality: "Lugbe",
    area: "Lugbe District",
    streetAddress: "Regis Estate, Lugbe, Airport Road Corridor, Abuja",
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    parkingSpaces: 0,
    plotSizeSqm: 250,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://www.regis.com.ng/wp-content/uploads/2024/10/land2-270x270_c.jpg",
      "https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg"
    ],
    amenities: [
      "Approved Building Designs",
      "Fast Developing Neighborhood",
      "Ready for Construction",
      "Clean Title"
    ],
    agentId: 1,
    createdAt: "2026-10-28T13:30:00Z"
  },
  {
    id: 1007,
    title: "Idu Estate Land with Approved Building Designs (500 SQMs)",
    slug: "idu-estate-land-approved-building-designs-500sqm",
    description: "Our estate lands available on the site and services model located in Idu Industrial area comes with Government approved building plans and are located in very suitable table flat ground.",
    category: "sale",
    propertyType: "land",
    subtype: "commercial-land",
    price: 7000000,
    currency: "NGN",
    period: null,
    state: "Abuja",
    locality: "Idu",
    area: "Idu Industrial Layout",
    streetAddress: "Regis Estate, Idu Industrial Area, Abuja",
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    parkingSpaces: 0,
    plotSizeSqm: 500,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://www.regis.com.ng/wp-content/uploads/2024/10/land-270x270_c.jpg",
      "https://www.regis.com.ng/wp-content/uploads/2022/08/post3.jpg"
    ],
    amenities: [
      "Approved Industrial & Commercial Plans",
      "Access to Railway Station",
      "Table Flat Ground",
      "Direct Regis Allocation"
    ],
    agentId: 1,
    createdAt: "2026-10-27T11:00:00Z"
  },
  {
    id: 1008,
    title: "Idu Estate Land with Approved Building Designs (250 SQMs)",
    slug: "idu-estate-land-approved-building-designs-250sqm",
    description: "Our estate lands available on the site and services model located in Idu Industrial area comes with Government approved building plans and are located in very suitable table flat ground.",
    category: "sale",
    propertyType: "land",
    subtype: "commercial-land",
    price: 3500000,
    currency: "NGN",
    period: null,
    state: "Abuja",
    locality: "Idu",
    area: "Idu Industrial Layout",
    streetAddress: "Regis Estate, Idu Industrial Area, Abuja",
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    parkingSpaces: 0,
    plotSizeSqm: 250,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://www.regis.com.ng/wp-content/uploads/2024/10/land2-270x270_c.jpg",
      "https://www.regis.com.ng/wp-content/uploads/2022/08/post3.jpg"
    ],
    amenities: [
      "Approved Plans",
      "Industrial Corridors",
      "Table Flat Topography"
    ],
    agentId: 1,
    createdAt: "2026-10-27T10:30:00Z"
  },
  {
    id: 1009,
    title: "Regis Royale Estate Luxury Villa Showcase",
    slug: "regis-royale-estate-luxury-villa-abuja",
    description: "Architectural masterpiece inside Regis Royale Estate. Built by Regis Integrated Services Limited with state-of-the-art construction, high-grade Italian finishing, serene community living, and round-the-clock facility management.",
    category: "sale",
    propertyType: "houses",
    subtype: "detached-duplex",
    price: 350000000,
    currency: "NGN",
    period: null,
    state: "Abuja",
    locality: "Wuse 2",
    area: "Regis Royale Estate",
    streetAddress: "Regis Royale Estate, Wuse Axis, Abuja",
    bedrooms: 5,
    bathrooms: 5,
    toilets: 6,
    parkingSpaces: 4,
    plotSizeSqm: 600,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.39.jpeg",
      "https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.36-1.jpeg",
      "https://www.regis.com.ng/wp-content/uploads/2024/10/3D10_042151.jpg"
    ],
    amenities: [
      "Gated Estate",
      "Estate Facilities",
      "POP Ceiling",
      "Swimming Pool",
      "Gym",
      "24/7 Security",
      "Ample Parking"
    ],
    agentId: 1,
    createdAt: "2026-10-26T09:00:00Z"
  },
  {
    id: 2953572,
    title: "(Off Plan) 80% Completed of Ultra-Luxury Smart 3 Bedrooms Apartment",
    slug: "off-plan-80-completed-of-ultra-luxury-smart-3-bedrooms-apartment",
    description: "Presenting this prestigious architectural masterpiece on Glover Road, Old Ikoyi. Featuring floor-to-ceiling double-glazed soundproof glass walls, automated smart lighting and climate controls, Italian imported fitted kitchen cabinets with Miele appliances, private elevator access directly into your foyer, swimming pool, world-class gymnasium, and 24/7 dedicated facility management.",
    category: "sale",
    propertyType: "flats",
    subtype: "flat",
    price: 850000000,
    currency: "NGN",
    period: null,
    state: "Lagos",
    locality: "Ikoyi",
    area: "Old Ikoyi",
    streetAddress: "Glover Road, Old Ikoyi, Ikoyi, Lagos",
    bedrooms: 3,
    bathrooms: 3,
    toilets: 4,
    parkingSpaces: 2,
    plotSizeSqm: 320,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://images.nigeriapropertycentre.com/properties/images/2953572/06866bd025185e-off-plan-70-completed-of-ultra-luxury-3bedroom-apartment-for-sale-old-ikoyi-ikoyi-lagos.jpg",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Fitted kitchen",
      "Air conditioning",
      "POP ceiling",
      "Built-in wardrobes",
      "En-suite bedrooms",
      "Swimming pool",
      "Elevator",
      "Gym",
      "24/7 power supply",
      "Standby generator",
      "CCTV surveillance",
      "Security gate"
    ],
    agentId: 1,
    createdAt: "2026-10-28T10:00:00Z"
  },
  {
    id: 3708696,
    title: "New 2 Bedroom Flat with Modern Finishing",
    slug: "new-2-bedroom-flat-isolo",
    description: "Newly built and tastefully finished 2 bedroom apartment in Bucknor Estate, Isolo. Spacious sitting room with guest toilet, all bedrooms en-suite with water heaters and contemporary wardrobes. Gated compound with ample car parking, prepaid meter, clean borehole water, and steady electricity supply.",
    category: "rent",
    propertyType: "flats",
    subtype: "flat",
    price: 2500000,
    currency: "NGN",
    period: "yearly",
    state: "Lagos",
    locality: "Isolo",
    area: "Bucknor Estate",
    streetAddress: "Bucknor Estate, Isolo, Lagos",
    bedrooms: 2,
    bathrooms: 2,
    toilets: 3,
    parkingSpaces: 2,
    plotSizeSqm: 180,
    isFurnished: false,
    isServiced: false,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://images.nigeriapropertycentre.com/properties/images/3708696/06ac12dbcbb737-new-2-bedroom-flat-for-rent-isolo-lagos.webp",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Fitted kitchen",
      "POP ceiling",
      "En-suite bedrooms",
      "Tiled floors",
      "Water heater",
      "Guest toilet",
      "Prepaid meter",
      "Borehole",
      "Security gate",
      "Car park"
    ],
    agentId: 2,
    createdAt: "2026-10-27T12:00:00Z"
  },
  {
    id: 3743191,
    title: "Sharp Studio Flat with Pool and Gym",
    slug: "sharp-studio-flat-with-pool-and-gym",
    description: "Fully furnished executive studio flat situated inside Victoria Crest Orchid, Lekki Phase 1. Highly requested by young professionals and expatriates. Features 24-hour round-the-clock power, Olympic swimming pool, fully fitted fitness gym, high-speed WiFi, smart TV, modern kitchenette, and dedicated parking space.",
    category: "rent",
    propertyType: "flats",
    subtype: "self-contain",
    price: 2500000,
    currency: "NGN",
    period: "yearly",
    state: "Lagos",
    locality: "Lekki",
    area: "Lekki Phase 1",
    streetAddress: "Victoria Crest Orchid, Lekki Phase 1, Lekki, Lagos",
    bedrooms: 1,
    bathrooms: 1,
    toilets: 1,
    parkingSpaces: 1,
    plotSizeSqm: 65,
    isFurnished: true,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://images.nigeriapropertycentre.com/properties/images/3743191/06adcd0fbb433f-sharp-studio-flat-with-pool-and-gym-for-rent-lekki-phase-1-lekki-lagos.webp",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Air conditioning",
      "24/7 power supply",
      "Standby generator",
      "Swimming pool",
      "Gym",
      "High-speed internet / WiFi",
      "Smart TV",
      "CCTV surveillance",
      "Security gate"
    ],
    agentId: 2,
    createdAt: "2026-10-26T15:00:00Z"
  },
  {
    id: 3695099,
    title: "Smart Spacious Newly Built Mini Flat",
    slug: "smart-spacious-newly-built-mini-flat-ajah",
    description: "Exceptional newly constructed room and parlour mini flat located behind Abraham Adesanya Estate, Ogombo, Ajah. Features a roomy living lounge with lovely POP cornice designs, kitchen with fitted cabinets, en-suite bedroom with water heater, interlocking concrete paving stones, and top-tier security personnel.",
    category: "rent",
    propertyType: "flats",
    subtype: "mini-flat",
    price: 2300000,
    currency: "NGN",
    period: "yearly",
    state: "Lagos",
    locality: "Ajah",
    area: "Ogombo",
    streetAddress: "Abraham Adesanya, Ogombo, Ajah, Lagos",
    bedrooms: 1,
    bathrooms: 1,
    toilets: 2,
    parkingSpaces: 1,
    plotSizeSqm: 90,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://images.nigeriapropertycentre.com/properties/images/3695099/06ab62bfbee7bb-smart-spacious-newly-built-mini-flat-room-and-parlor-apartment-upsta-mini-flats-for-rent-ajah-lagos.webp",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Fitted kitchen",
      "POP ceiling",
      "Water heater",
      "Prepaid meter",
      "Borehole",
      "Security gate",
      "Car park",
      "Drainage"
    ],
    agentId: 1,
    createdAt: "2026-10-25T09:00:00Z"
  },
  {
    id: 3751234,
    title: "Spacious 4 Bedroom Apartment with Pool & Gym in Banana Island",
    slug: "spacious-4-bedroom-apartment-banana-island-ikoyi",
    description: "Luxurious waterfront living in the prestigious Banana Island, Ikoyi. This exquisite 4 bedroom apartment includes an expansive terrace with sea breeze, marble floors throughout, fully fitted chef's kitchen, private jetty access, Olympic size swimming pool, fitness gym, squash court, 2 rooms boys quarters, and 24-hour electricity with military-grade estate security.",
    category: "rent",
    propertyType: "flats",
    subtype: "flat",
    price: 36000000,
    currency: "NGN",
    period: "yearly",
    state: "Lagos",
    locality: "Ikoyi",
    area: "Banana Island",
    streetAddress: "Banana Island, Ikoyi, Lagos",
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parkingSpaces: 3,
    plotSizeSqm: 450,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://images.nigeriapropertycentre.com/properties/images/3751234/06ae3e746d80ab-4-bedroom-flat-for-rent-banana-island-ikoyi-lagos.webp",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Fitted kitchen",
      "Air conditioning",
      "POP ceiling",
      "En-suite bedrooms",
      "Jacuzzi / bathtub",
      "Walk-in closet",
      "24/7 power supply",
      "Standby generator",
      "Swimming pool",
      "Gym",
      "Elevator",
      "Boys' quarters (BQ)",
      "Car park",
      "CCTV surveillance",
      "Electric fence"
    ],
    agentId: 4,
    createdAt: "2026-10-24T18:00:00Z"
  },
  {
    id: 3751214,
    title: "New 4 Bedroom Semi-Detached Duplex + BQ",
    slug: "new-4-bedroom-semi-detached-duplex-bq-life-camp-abuja",
    description: "Contemporary and architecturally sound 4 bedroom semi-detached duplex situated in an exclusive gated estate in Life Camp, Abuja. Features spacious ante-room, family lounge on the first floor, fully fitted kitchen with pantry, rooftop relaxation terrace, en-suite staff quarters (BQ), stamped concrete flooring, and excellent access road networks.",
    category: "sale",
    propertyType: "houses",
    subtype: "semi-detached-duplex",
    price: 450000000,
    currency: "NGN",
    period: null,
    state: "Abuja",
    locality: "Life Camp",
    area: "Life Camp",
    streetAddress: "Life Camp, Abuja",
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parkingSpaces: 4,
    plotSizeSqm: 500,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://images.nigeriapropertycentre.com/properties/images/3751214/06ae3b8dae0e87-new-4-bedroom-semi-detached-duplex-bq-semi-detached-duplexes-for-sale-life-camp-abuja.webp",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Fitted kitchen",
      "POP ceiling",
      "Built-in wardrobes",
      "En-suite bedrooms",
      "Water heater",
      "Family lounge",
      "Balcony",
      "Boys' quarters (BQ)",
      "Car park",
      "Perimeter fencing",
      "Security gate",
      "Tarred or paved road"
    ],
    agentId: 3,
    createdAt: "2026-10-23T11:30:00Z"
  },
  {
    id: 3810021,
    title: "5 Bedroom Fully Detached Luxury Duplex with Cinema & Private Pool",
    slug: "5-bedroom-detached-duplex-cinema-pool-ikate-lekki",
    description: "Opulent 5 bedroom mansion located in the serene neighbourhood of Ikate, Lekki. Boasting private cinema hall, private swimming pool, automated smart home tech, double-volume living room, fully fitted Italian kitchen with heat extractor, jacuzzi in primary suite, and 2-room staff quarters.",
    category: "sale",
    propertyType: "houses",
    subtype: "detached-duplex",
    price: 680000000,
    currency: "NGN",
    period: null,
    state: "Lagos",
    locality: "Lekki",
    area: "Ikate",
    streetAddress: "Admiralty Way, Ikate Elegushi, Lekki, Lagos",
    bedrooms: 5,
    bathrooms: 5,
    toilets: 6,
    parkingSpaces: 5,
    plotSizeSqm: 650,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Fitted kitchen",
      "Air conditioning",
      "POP ceiling",
      "En-suite bedrooms",
      "Smart home",
      "Cinema room",
      "Jacuzzi / bathtub",
      "Swimming pool",
      "Boys' quarters (BQ)",
      "Car park",
      "CCTV surveillance"
    ],
    agentId: 1,
    createdAt: "2026-10-22T14:15:00Z"
  },
  {
    id: 3820015,
    title: "Prime Commercial Residential Land with Governor's Consent",
    slug: "prime-commercial-residential-land-guzape-abuja",
    description: "Strategically positioned dry table land situated within diplomatic and highbrow zone in Guzape District, Abuja. Measuring approximately 1,500 square meters. Complete with clean Governor's Consent (C of O), verified survey, and ready for immediate high-density residential development or luxury villa construction.",
    category: "sale",
    propertyType: "land",
    subtype: "residential-land",
    price: 320000000,
    currency: "NGN",
    period: null,
    state: "Abuja",
    locality: "Guzape",
    area: "Guzape District",
    streetAddress: "Guzape Hill, Guzape District, Abuja",
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    parkingSpaces: 0,
    plotSizeSqm: 1500,
    isFurnished: false,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Perimeter fencing",
      "Security gate",
      "Tarred or paved road",
      "Drainage"
    ],
    agentId: 3,
    createdAt: "2026-10-21T08:00:00Z"
  },
  {
    id: 3830090,
    title: "Luxury 2 Bedroom Shortlet Apartment with Rooftop Terrace",
    slug: "luxury-2-bedroom-shortlet-apartment-oniru-vi-lagos",
    description: "5-star hospitality experience in Oniru, Victoria Island. High-speed fiber WiFi, Netflix, DStv Premium, PS5 games console, daily housekeeping, 24/7 electricity, chef available on request, and breathtaking ocean views from private balcony and rooftop terrace.",
    category: "shortlet",
    propertyType: "flats",
    subtype: "flat",
    price: 150000,
    currency: "NGN",
    period: "daily",
    state: "Lagos",
    locality: "Victoria Island",
    area: "Oniru",
    streetAddress: "Palace Way, Oniru, Victoria Island, Lagos",
    bedrooms: 2,
    bathrooms: 2,
    toilets: 3,
    parkingSpaces: 2,
    plotSizeSqm: 140,
    isFurnished: true,
    isServiced: true,
    isShared: false,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Air conditioning",
      "24/7 power supply",
      "Swimming pool",
      "Gym",
      "Netflix",
      "DStv",
      "Smart TV",
      "PlayStation / games console",
      "Housekeeping",
      "Chef on request",
      "Washing machine",
      "Self check-in / smart lock",
      "Dedicated workspace"
    ],
    agentId: 4,
    createdAt: "2026-10-20T17:00:00Z"
  }
];

export const SEED_REQUESTS: SeedPropertyRequest[] = [
  {
    id: 1,
    name: "Dr. Oladipo Adeleke",
    email: "oladipo.adeleke@gmail.com",
    phone: "08033219842",
    requestType: "buy",
    propertyType: "houses",
    state: "Lagos",
    locality: "Lekki Phase 1",
    bedrooms: 4,
    budgetMin: 350000000,
    budgetMax: 500000000,
    details: "Urgent need for an authentic 4-bedroom contemporary detached duplex with swimming pool and BQ in a secure, flood-free gated estate around Lekki Phase 1 or Ikate. Governor's consent or C of O required.",
    status: "active",
    createdAt: "2026-10-28T14:30:00Z"
  },
  {
    id: 2,
    name: "Amina Mohammed-Bello",
    email: "amina.bello@consultant.ng",
    phone: "08028741129",
    requestType: "rent",
    propertyType: "flats",
    state: "Abuja",
    locality: "Maitama",
    bedrooms: 3,
    budgetMin: 12000000,
    budgetMax: 18000000,
    details: "Expatriate client looking for a fully serviced luxury 3-bedroom apartment with 24/7 dedicated generator, elevator, and swimming pool in Maitama or Wuse 2. Direct mandates from registered agents only.",
    status: "active",
    createdAt: "2026-10-29T09:15:00Z"
  },
  {
    id: 3,
    name: "Engr. Chukwudi Okoro",
    email: "chukwudi.okoro@petrotech.com",
    phone: "08149023341",
    requestType: "buy",
    propertyType: "land",
    state: "Lagos",
    locality: "Epe",
    bedrooms: 0,
    budgetMin: 30000000,
    budgetMax: 70000000,
    details: "Looking for 2 to 4 contiguous plots of 100% dry land with Gazette or C of O close to the Lekki-Epe Expressway corridor or Alaro City. Immediate inspection and direct payment ready.",
    status: "active",
    createdAt: "2026-10-29T11:45:00Z"
  },
  {
    id: 4,
    name: "Folashade Balogun & Co.",
    email: "info@balogunlawpartners.ng",
    phone: "08055612440",
    requestType: "rent",
    propertyType: "commercial",
    state: "Lagos",
    locality: "Victoria Island",
    bedrooms: 0,
    budgetMin: 25000000,
    budgetMax: 40000000,
    details: "Legal consulting firm seeking approximately 250 - 350 sqm open-plan commercial office space with ample dedicated parking spaces along Adeola Odeku or Sanusi Fafunwa, Victoria Island.",
    status: "active",
    createdAt: "2026-10-27T16:20:00Z"
  },
  {
    id: 5,
    name: "Capt. Tariere Briggs",
    email: "tariere.briggs@offshore.org",
    phone: "08034567812",
    requestType: "buy",
    propertyType: "houses",
    state: "Rivers",
    locality: "Old GRA, Port Harcourt",
    bedrooms: 5,
    budgetMin: 200000000,
    budgetMax: 350000000,
    details: "Looking for a luxury 5-bedroom mansion or fully detached duplex on at least 800sqm in Old GRA or Peter Odili Road, Port Harcourt.",
    status: "active",
    createdAt: "2026-10-26T10:00:00Z"
  },
  {
    id: 6,
    name: "Mrs. Nkechi Nwosu",
    email: "nkechi.nwosu@healthfirst.ng",
    phone: "08123984401",
    requestType: "rent",
    propertyType: "flats",
    state: "Lagos",
    locality: "Ikeja",
    bedrooms: 2,
    budgetMin: 4000000,
    budgetMax: 6500000,
    details: "Decent, newly built 2-bedroom flat with modern fittings, POP ceiling, prepaid meter in Ikeja GRA, Maryland, or Magodo Phase 2. Client is a medical professional.",
    status: "active",
    createdAt: "2026-10-30T08:10:00Z"
  },
  {
    id: 7,
    name: "Heritage Prime Developments",
    email: "acquisitions@heritageprimeng.com",
    phone: "07038891200",
    requestType: "jv",
    propertyType: "land",
    state: "Lagos",
    locality: "Ikoyi",
    bedrooms: 0,
    budgetMin: 500000000,
    budgetMax: 1500000000,
    details: "Grade A developer seeking prime Joint Venture land (minimum 1,500sqm) in Old Ikoyi or Banana Island for luxury high-rise condominium development. Premium sharing ratio offered.",
    status: "active",
    createdAt: "2026-10-25T13:40:00Z"
  },
  {
    id: 8,
    name: "Babajide Adekunle",
    email: "b.adekunle@fintechlead.io",
    phone: "09012349911",
    requestType: "shortlet",
    propertyType: "flats",
    state: "Lagos",
    locality: "Oniru",
    bedrooms: 2,
    budgetMin: 120000,
    budgetMax: 200000,
    details: "Need a premium serviced 2-bedroom shortlet apartment with ocean view or pool access for 3 weeks starting next week. 24/7 power and high-speed fibre internet mandatory.",
    status: "active",
    createdAt: "2026-10-30T12:00:00Z"
  }
];

