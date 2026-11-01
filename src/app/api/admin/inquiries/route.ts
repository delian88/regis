import { NextRequest, NextResponse } from 'next/server';
import {
  getInspectionBookings,
  addInspectionBooking,
  updateInspectionBooking,
  deleteInspectionBooking,
} from '@/db';

export async function GET() {
  try {
    const list = await getInspectionBookings();
    return NextResponse.json({ success: true, count: list.length, inquiries: list });
  } catch (error) {
    console.error('Error in GET /api/admin/inquiries:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.fullName || !body.phone) {
      return NextResponse.json({ success: false, error: 'Full name and phone are required' }, { status: 400 });
    }

    const created = await addInspectionBooking({
      fullName: body.fullName,
      email: body.email || '',
      phone: body.phone,
      propertyInterest: body.propertyInterest || 'General Inquiry',
      preferredDate: body.preferredDate || new Date().toISOString().split('T')[0],
      message: body.message || '',
      status: body.status || 'pending',
    });

    return NextResponse.json({ success: true, inquiry: created });
  } catch (error) {
    console.error('Error in POST /api/admin/inquiries:', error);
    return NextResponse.json({ success: false, error: 'Failed creating inquiry' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'id and status are required' }, { status: 400 });
    }

    const updated = await updateInspectionBooking(Number(id), status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error('Error in PATCH /api/admin/inquiries:', error);
    return NextResponse.json({ success: false, error: 'Failed updating inquiry' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'id parameter is required' }, { status: 400 });
    }

    const deleted = await deleteInspectionBooking(Number(id));
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Inquiry not found or could not be deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/admin/inquiries:', error);
    return NextResponse.json({ success: false, error: 'Failed deleting inquiry' }, { status: 500 });
  }
}
