import { NextRequest, NextResponse } from 'next/server';
import { getAllSiteContent, getSiteContent, updateSiteContent, resetSiteContent, SiteContentMap } from '@/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section') as keyof SiteContentMap | null;

    if (section) {
      const data = getSiteContent(section);
      return NextResponse.json({ success: true, section, data });
    }

    const all = getAllSiteContent();
    return NextResponse.json({ success: true, data: all });
  } catch (error) {
    console.error('Error in GET /api/admin/content:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch site content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data } = body;

    if (!section || !data) {
      return NextResponse.json(
        { success: false, error: 'Section and data are required' },
        { status: 400 }
      );
    }

    const updated = updateSiteContent(section as keyof SiteContentMap, data);

    return NextResponse.json({
      success: true,
      message: `Section "${section}" updated successfully`,
      data: updated,
    });
  } catch (error) {
    console.error('Error in PUT /api/admin/content:', error);
    return NextResponse.json({ success: false, error: 'Failed to update content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.action === 'reset') {
      const reset = resetSiteContent();
      return NextResponse.json({
        success: true,
        message: 'Site content reset to official Regis defaults',
        data: reset,
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in POST /api/admin/content:', error);
    return NextResponse.json({ success: false, error: 'Failed processing request' }, { status: 500 });
  }
}
