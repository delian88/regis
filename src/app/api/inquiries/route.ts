import { NextRequest, NextResponse } from 'next/server';
import { addInspectionBooking } from '@/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.fullName || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Please provide your full name and phone number.' },
        { status: 400 }
      );
    }

    const created = addInspectionBooking({
      fullName: body.fullName,
      email: body.email || '',
      phone: body.phone,
      propertyInterest: body.propertyInterest || 'General Inquiry',
      preferredDate: body.preferredDate || new Date().toISOString().split('T')[0],
      message: body.message || '',
      status: 'pending',
    });

    return NextResponse.json({
      success: true,
      message: 'Inspection request received. Our sales director will contact you promptly.',
      bookingId: created.id,
    });
  } catch (error) {
    console.error('Error in /api/inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Could not record inquiry. Please call or WhatsApp us directly.' },
      { status: 500 }
    );
  }
}
