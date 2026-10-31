import { NextRequest, NextResponse } from 'next/server';
import { getProperties, createProperty } from '@/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const propertyType = searchParams.get('propertyType') || undefined;
    const status = searchParams.get('status') || undefined;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 100;

    const list = await getProperties({
      category,
      propertyType,
      status,
      limit,
    });

    return NextResponse.json({
      success: true,
      count: list.length,
      properties: list,
    });
  } catch (error) {
    console.error('Error in GET /api/admin/properties:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.price || !body.propertyType) {
      return NextResponse.json(
        { success: false, error: 'Title, price, and property type are required fields.' },
        { status: 400 }
      );
    }

    const created = await createProperty({
      title: body.title,
      slug: body.slug || undefined,
      description: body.description || '',
      category: body.category || 'sale',
      propertyType: body.propertyType || 'houses',
      subtype: body.subtype || 'detached-duplex',
      price: Number(body.price),
      currency: body.currency || 'NGN',
      period: body.period || null,
      state: body.state || 'Abuja',
      locality: body.locality || 'Guzape',
      area: body.area || '',
      streetAddress: body.streetAddress || '',
      bedrooms: Number(body.bedrooms || 0),
      bathrooms: Number(body.bathrooms || 0),
      toilets: Number(body.toilets || 0),
      parkingSpaces: Number(body.parkingSpaces || 0),
      plotSizeSqm: body.plotSizeSqm ? Number(body.plotSizeSqm) : null,
      isFurnished: Boolean(body.isFurnished),
      isServiced: Boolean(body.isServiced ?? true),
      isShared: Boolean(body.isShared),
      isFeatured: Boolean(body.isFeatured),
      isVerified: Boolean(body.isVerified ?? true),
      status: body.status || 'available',
      images: Array.isArray(body.images) ? body.images.filter(Boolean) : [],
      videoUrl: body.videoUrl || null,
      videos: Array.isArray(body.videos) ? body.videos.filter(Boolean) : (body.videoUrl ? [body.videoUrl] : []),
      amenities: Array.isArray(body.amenities) ? body.amenities : [],
      agentId: Number(body.agentId || 1),
    });

    return NextResponse.json({
      success: true,
      message: 'Property created successfully',
      property: created,
    });
  } catch (error) {
    console.error('Error in POST /api/admin/properties:', error);
    return NextResponse.json({ success: false, error: 'Failed to create property' }, { status: 500 });
  }
}
