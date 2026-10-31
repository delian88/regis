export interface SiteContentMap {
  homepage_hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimaryText: string;
    ctaPrimaryLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
    backgroundImage: string;
  };
  homepage_pillars: {
    tag: string;
    title: string;
    subtitle: string;
    pillars: Array<{
      id: string;
      title: string;
      tag: string;
      description: string;
      image: string;
      link: string;
    }>;
  };
  homepage_story: {
    tag: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    stats: Array<{
      label: string;
      value: string;
      sub: string;
    }>;
    partnerTitle: string;
    partnerDesc: string;
    image: string;
  };
  homepage_gallery: {
    tag: string;
    title: string;
    subtitle: string;
    items: Array<{
      id?: string;
      title: string;
      category: string;
      image: string;
      desc: string;
    }>;
  };
  homepage_cta: {
    tag: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    phoneText: string;
    phone: string;
    whatsapp: string;
  };
  about_page: {
    heroTitle: string;
    heroSubtitle: string;
    storyTitle: string;
    storyP1: string;
    storyP2: string;
    mission: string;
    vision: string;
    coreValues: string[];
    services: Array<{
      title: string;
      desc: string;
    }>;
  };
  projects_page: {
    heroTitle: string;
    heroSubtitle: string;
    introText: string;
  };
  building_types_page: {
    heroTitle: string;
    heroSubtitle: string;
    introText: string;
  };
  contact_info: {
    companyName: string;
    address: string;
    phonePrimary: string;
    phoneSecondary: string;
    whatsapp: string;
    email: string;
    salesEmail: string;
    workingHours: string;
    fhaPartnershipBadge: string;
  };
}

export const DEFAULT_SITE_CONTENT: SiteContentMap = {
  homepage_hero: {
    badge: 'AFFORDABLE LUXURIOUS HOMES — DESIGNED TO GIVE YOU LUXURY, YET AFFORDABLE',
    title: 'PROVIDING AFFORDABLE HOUSING FOR DESERVING NIGERIANS',
    subtitle:
      'Welcome to Regis Integrated Services Limited. Explore premier luxury residences in Guzape, FHA Golden Jubilee Estate Mbora, and serviced estate lands across Abuja and Nigeria.',
    ctaPrimaryText: 'Explore Developments',
    ctaPrimaryLink: '/projects',
    ctaSecondaryText: 'Book Inspection',
    ctaSecondaryLink: '/contact-us',
    backgroundImage: 'https://www.regis.com.ng/wp-content/uploads/revslider/homepage-slider-1/1.jpg',
  },
  homepage_pillars: {
    tag: 'OUR ARCHITECTURAL & ENGINEERING EXCELLENCE',
    title: 'Built on Integrity, Engineered for Generations',
    subtitle:
      'From concept design to handover, Regis Integrated Services Limited delivers uncompromising quality in every square meter.',
    pillars: [
      {
        id: 'pillar-1',
        title: 'Luxurious Homes',
        tag: 'Affordable Luxury',
        description:
          'We are committed to delivering top-of-the-range luxury residences and duplexes at price points that empower Nigerian families and diaspora investors to build generational wealth.',
        image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg',
        link: '/building-types',
      },
      {
        id: 'pillar-2',
        title: 'State-of-the-Art Construction',
        tag: 'Turnkey Civil Engineering',
        description:
          'Our multidisciplinary engineering teams leverage high-grade reinforced concrete, precision site casting, superior structural frameworks, and premium imported finishes.',
        image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/post3.jpg',
        link: '/about-us',
      },
      {
        id: 'pillar-3',
        title: 'Modern Architectural Designs',
        tag: 'Signature Aesthetics',
        description:
          'Every Regis prototype features open-plan spatial flow, double-volume living areas, energy-efficient natural illumination, and weather-resilient contemporary elevations.',
        image:
          'https://www.regis.com.ng/wp-content/uploads/2022/08/JaysvilleInterior-Design-Architectural-Design.jpg',
        link: '/building-types',
      },
    ],
  },
  homepage_story: {
    tag: 'A DECADE OF ENGINEERING DISTINCTION',
    title: 'Providing Affordable Housing for Deserving Nigerians',
    subtitle:
      'For over a decade, Regis Integrated Services Limited (RISL) has stood at the forefront of Abuja’s urban evolution.',
    p1: 'Over the past 10 years, we have designed, managed, and constructed over 1,000 residential units and serviced estate schemes across the Federal Capital Territory and beyond. Our commitment is founded on delivering affordable luxurious homes without sacrificing architectural magnificence.',
    p2: 'In trusted collaboration with national institutions including the Federal Housing Authority (FHA) and FHA Mortgage Bank, we pioneer homeownership through innovative financing models and site-and-services master plans.',
    stats: [
      { label: 'Years Experience', value: '10+', sub: 'Continuous Excellence' },
      { label: 'Happy Clients', value: '200+', sub: 'Diaspora & Local Homeowners' },
      { label: 'Completed Projects', value: '1,000+', sub: 'Duplexes, Flats & Plots' },
      { label: 'Quality Assurance', value: '100%', sub: 'Guaranteed Structural Integrity' },
    ],
    partnerTitle: 'Official Partner with Federal Housing Authority (FHA)',
    partnerDesc:
      'Accredited developer delivering landmark housing at FHA Golden Jubilee Estate Mbora, backed by single-digit mortgage facilities.',
    image:
      'https://www.regis.com.ng/wp-content/uploads/2022/08/JaysvilleInterior-Design-Architectural-Design.jpg',
  },
  homepage_gallery: {
    tag: 'REAL-TIME ONSITE PROGRESS & PANORAMAS',
    title: 'Views and Sights of Regis Royale Estate',
    subtitle:
      'A curated look into our live construction sites, ongoing luxury finishes, and architectural achievements.',
    items: [
      {
        id: 'g-1',
        title: 'Regis Royale Estate — Exterior Elevation',
        category: 'Architectural 3D',
        image: 'https://www.regis.com.ng/wp-content/uploads/2024/10/3D3_042345-270x270_c.jpg',
        desc: 'Contemporary aesthetic featuring perimeter security and landscaped boulevard.',
      },
      {
        id: 'g-2',
        title: 'Luxury Terrace Duplex Facade',
        category: 'Structural Progress',
        image:
          'https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.39.jpeg',
        desc: 'Superstructure framing and external plastering underway.',
      },
      {
        id: 'g-3',
        title: 'Interior Living Room Finishing',
        category: 'Interior Fit-Out',
        image:
          'https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.36-1.jpeg',
        desc: 'Recessed ambient ceiling lighting and premium marble floor installations.',
      },
      {
        id: 'g-4',
        title: 'Subterranean Walkout Basement',
        category: 'Excavation & Civil',
        image:
          'https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.34-1.jpeg',
        desc: 'Reinforced retaining walls for cinema and private gym facility.',
      },
      {
        id: 'g-5',
        title: 'Aerial Drone Overview — Mbora & Guzape',
        category: 'Site Inspection',
        image:
          'https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.33.jpeg',
        desc: 'Prime strategic positioning with panoramic views across the hills.',
      },
      {
        id: 'g-6',
        title: 'Serviced Estate Layout Demarcation',
        category: 'Survey & Engineering',
        image: 'https://www.regis.com.ng/wp-content/uploads/2024/10/land-270x270_c.jpg',
        desc: 'Approved cadastral beacon points and internal access road network.',
      },
    ],
  },
  homepage_cta: {
    tag: 'START YOUR HOMEOWNERSHIP JOURNEY TODAY',
    title: "LET'S BUILD YOUR DREAM, TOGETHER!",
    subtitle:
      'Whether you seek an off-plan luxury terrace in Guzape, an FHA-backed family home in Mbora, or secure serviced land in Lugbe and Idu, our directors are ready to assist you.',
    buttonText: 'View All Projects',
    buttonLink: '/projects',
    phoneText: 'Direct Sales Hotline',
    phone: '+234 (0) 815 555 5168',
    whatsapp: '+2348155555168',
  },
  about_page: {
    heroTitle: 'About Regis Integrated Services Limited',
    heroSubtitle:
      'A premier Nigerian property development, civil construction, and project management enterprise headquartered in Abuja.',
    storyTitle: 'Building Nigeria’s Future on Integrity and Engineering Excellence',
    storyP1:
      'Regis Integrated Services Limited was incorporated with a vision to redefine urban real estate across Nigeria by pairing contemporary architectural aesthetics with attainable pricing structures.',
    storyP2:
      'Headquartered at 22 Koforidua Street, Wuse Zone 2, Abuja, RISL has successfully steered commercial, residential, and infrastructural developments for private investors, public sector agencies, and diaspora clients.',
    mission:
      'To deliver innovative, aesthetically compelling, structurally sound, and affordable housing solutions that provide exceptional living standards and sustainable capital appreciation for our clients.',
    vision:
      'To be recognized as West Africa’s most trustworthy, customer-centric, and technically proficient real estate development and turnkey construction conglomerate.',
    coreValues: [
      'Integrity & Accountability',
      'Architectural Innovation',
      'Structural Durability',
      'Timely Delivery',
      'Client-Centric Service',
    ],
    services: [
      {
        title: 'Architecture & Spatial Design',
        desc: 'Contemporary 3D spatial models, functional layouts, double-volume elevations, and eco-friendly ventilation systems tailor-made for African climates.',
      },
      {
        title: 'Interior Design & Fit-Out',
        desc: 'Custom imported marble floors, recessed LED ambient cove lighting, and bespoke kitchen cabinetry.',
      },
      {
        title: 'Design & Build Turnkey Construction',
        desc: 'Complete end-to-end civil engineering, reinforced concrete framing, roofing, and turnkey finishing under one accountable contract.',
      },
      {
        title: 'Site Supervision & Quality Control',
        desc: 'Senior site engineers oversee daily casting, soil compaction tests, rebar reinforcement inspections, and building code compliance.',
      },
      {
        title: 'Project Management & Delivery',
        desc: 'Milestone tracking, budget transparency, and safety protocols to ensure on-time delivery without cost overruns.',
      },
      {
        title: 'Cost Studies & Feasibility',
        desc: 'Detailed Bill of Quantities (BOQ), material market price tracking, and financial feasibility studies that optimize capital efficiency.',
      },
    ],
  },
  projects_page: {
    heroTitle: 'Projects & Signature Developments',
    heroSubtitle:
      'Explore our ongoing, completed, and off-plan residential estates and serviced land developments across Abuja.',
    introText:
      'Every Regis project embodies our commitment to structural durability, refined aesthetics, and transparent title documentation.',
  },
  building_types_page: {
    heroTitle: 'Building Types & Architectural Units',
    heroSubtitle:
      'Explore our diverse architectural prototypes and housing units designed to suit various lifestyle requirements and budgets.',
    introText:
      'From expansive 6-bedroom luxury terrace duplexes with private walk-out basements to compact family duplexes and serviced plots, Regis delivers homes built to inspire.',
  },
  contact_info: {
    companyName: 'Regis Integrated Services Limited (RISL)',
    address: 'Plot 22 Koforidua Street, Off Michael Okpara Way, Wuse Zone 2, Abuja, FCT, Nigeria',
    phonePrimary: '+234 (0) 815 555 5168',
    phoneSecondary: '+234 (0) 902 444 4123',
    whatsapp: '+2348155555168',
    email: 'info@regis.com.ng',
    salesEmail: 'sales@regis.com.ng',
    workingHours: 'Monday – Friday: 8:00 AM – 5:30 PM | Saturday: 10:00 AM – 4:00 PM',
    fhaPartnershipBadge: 'Official Partner with Federal Housing Authority (FHA)',
  },
};
