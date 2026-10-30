import { NextResponse } from 'next/server';
import { getProperties, db } from '@/db';
import { properties } from '@/db/schema';
import { SEED_PROPERTIES } from '@/db/seed-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const propertyType = searchParams.get('propertyType') || undefined;
  const state = searchParams.get('state') || undefined;
  const locality = searchParams.get('locality') || undefined;
  const bedrooms = searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined;
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 50;

  try {
    const list = await getProperties({
      category,
      propertyType,
      state,
      locality,
      bedrooms,
      minPrice,
      maxPrice,
      limit,
    });
    return NextResponse.json({ success: true, count: list.length, data: list });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newProperty = {
      title: body.title,
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: body.description || '',
      category: (body.category || 'sale') as 'sale' | 'rent' | 'shortlet' | 'jv',
      propertyType: (body.propertyType || 'houses') as 'flats' | 'houses' | 'land' | 'commercial',
      subtype: body.subtype || 'detached-duplex',
      price: Number(body.price) || 0,
      currency: 'NGN',
      period: body.period || null,
      state: body.state || 'Lagos',
      locality: body.locality || 'Lekki',
      area: body.locality || 'Lekki Phase 1',
      streetAddress: body.streetAddress || '',
      bedrooms: Number(body.bedrooms) || 0,
      bathrooms: Number(body.bathrooms) || 0,
      toilets: Number(body.bathrooms) || 0,
      parkingSpaces: 2,
      plotSizeSqm: Number(body.plotSizeSqm) || null,
      isFurnished: false,
      isServiced: false,
      isShared: false,
      images: body.imageUrl ? [body.imageUrl] : [body.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      amenities: ['24/7 Security', 'Water Treatment', 'Ample Parking', 'POP Ceilings'],
      isFeatured: false,
      isVerified: true,
      agentId: 1,
    };

    if (db) {
      const inserted = await db.insert(properties).values({
        title: newProperty.title,
        slug: newProperty.slug,
        description: newProperty.description,
        category: newProperty.category,
        propertyType: newProperty.propertyType,
        subtype: newProperty.subtype,
        price: newProperty.price,
        currency: newProperty.currency,
        period: newProperty.period,
        state: newProperty.state,
        locality: newProperty.locality,
        area: newProperty.area,
        streetAddress: newProperty.streetAddress,
        bedrooms: newProperty.bedrooms,
        bathrooms: newProperty.bathrooms,
        toilets: newProperty.toilets,
        parkingSpaces: newProperty.parkingSpaces,
        plotSizeSqm: newProperty.plotSizeSqm,
        isFurnished: newProperty.isFurnished,
        isServiced: newProperty.isServiced,
        isShared: newProperty.isShared,
        isFeatured: newProperty.isFeatured,
        isVerified: newProperty.isVerified,
        images: newProperty.images,
        amenities: newProperty.amenities,
        agentId: newProperty.agentId,
      }).returning();
      return NextResponse.json({ success: true, data: inserted[0] }, { status: 201 });
    }

    // In-memory fallback
    const id = SEED_PROPERTIES.length + 1;
    const createdItem = { id, ...newProperty, createdAt: new Date().toISOString() };
    SEED_PROPERTIES.unshift(createdItem);

    return NextResponse.json({ success: true, data: createdItem }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create listing' },
      { status: 500 }
    );
  }
}
