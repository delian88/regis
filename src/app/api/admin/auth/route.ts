import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL || 'vicollins2003@gmail.com';
const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD || 'Admin@regis$1';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const normalizedEmail = (email || '').trim().toLowerCase();
    const isSuperadminMatch =
      normalizedEmail === SUPERADMIN_EMAIL.toLowerCase() && password === SUPERADMIN_PASSWORD;

    // Check with Supabase Auth as well
    let supabaseAuthSuccess = false;
    let userId: string | null = null;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && anonKey) {
      try {
        const client = createClient(supabaseUrl, anonKey);
        const { data, error } = await client.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (!error && data?.user) {
          supabaseAuthSuccess = true;
          userId = data.user.id;
        }
      } catch (authErr) {
        console.warn('Supabase Auth check note:', authErr);
      }
    }

    if (!isSuperadminMatch && !supabaseAuthSuccess) {
      return NextResponse.json(
        { success: false, error: 'Invalid administrator email or password.' },
        { status: 401 }
      );
    }

    // Set secure admin session cookie
    const cookieStore = await cookies();
    cookieStore.set('regis_admin_session', JSON.stringify({
      email: normalizedEmail,
      role: 'superadmin',
      loggedInAt: new Date().toISOString(),
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      message: 'Superadmin authenticated successfully',
      user: {
        email: normalizedEmail,
        role: 'superadmin',
        name: 'Regis Super Administrator',
      },
    });
  } catch (error) {
    console.error('Error in /api/admin/auth:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('regis_admin_session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    const session = JSON.parse(sessionCookie.value);
    return NextResponse.json({ authenticated: true, user: session });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('regis_admin_session');
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}

