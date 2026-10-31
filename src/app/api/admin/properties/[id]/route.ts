import { NextRequest, NextResponse } from 'next/server';
import { getPropertyById, updateProperty, deleteProperty } from '@/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const property = await getPropertyById(id);

    if (!property) {
      return NextResponse.json({ success: false, error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.error('Error in GET /api/admin/properties/[id]:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch property' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updated = await updateProperty(id, {
      ...body,
      price: body.price !== undefined ? Number(body.price) : undefined,
      bedrooms: body.bedrooms !== undefined ? Number(body.bedrooms) : undefined,
      bathrooms: body.bathrooms !== undefined ? Number(body.bathrooms) : undefined,
      toilets: body.toilets !== undefined ? Number(body.toilets) : undefined,
      parkingSpaces: body.parkingSpaces !== undefined ? Number(body.parkingSpaces) : undefined,
      plotSizeSqm: body.plotSizeSqm !== undefined ? (body.plotSizeSqm ? Number(body.plotSizeSqm) : null) : undefined,
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Property updated successfully',
      property: updated,
    });
  } catch (error) {
    console.error('Error in PUT /api/admin/properties/[id]:', error);
    return NextResponse.json({ success: false, error: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const deleted = await deleteProperty(id);

    return NextResponse.json({
      success: true,
      message: deleted ? 'Property deleted successfully' : 'Property removed from view',
    });
  } catch (error) {
    console.error('Error in DELETE /api/admin/properties/[id]:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete property' }, { status: 500 });
  }
}
