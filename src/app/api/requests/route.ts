import { NextResponse } from 'next/server';
import { db, getPropertyRequests, addPropertyRequest } from '@/db';
import { propertyRequests } from '@/db/schema';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestType = searchParams.get('requestType') || searchParams.get('category') || undefined;
  const propertyType = searchParams.get('propertyType') || undefined;
  const state = searchParams.get('state') || undefined;
  const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 50;

  try {
    const list = await getPropertyRequests({
      requestType,
      propertyType,
      state,
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

    const newRequest = {
      name: body.contactName || body.name || 'Anonymous Seeker',
      email: body.contactEmail || body.email || 'seeker@example.com',
      phone: body.contactPhone || body.phone || '08000000000',
      requestType: (body.category || body.requestType || 'rent') as 'buy' | 'rent' | 'shortlet' | 'jv',
      propertyType: body.propertyType || 'flats',
      state: body.state || 'Lagos',
      locality: body.locality || 'Lekki',
      bedrooms: Number(body.bedrooms) || 0,
      budgetMin: Number(body.minPrice || body.budgetMin) || null,
      budgetMax: Number(body.maxPrice || body.budgetMax) || null,
      details: body.description || body.details || '',
      status: 'active',
    };

    if (db) {
      const inserted = await db.insert(propertyRequests).values(newRequest).returning();
      return NextResponse.json({ success: true, data: inserted[0] }, { status: 201 });
    }

    const created = await addPropertyRequest(newRequest);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to post property request' },
      { status: 500 }
    );
  }
}

