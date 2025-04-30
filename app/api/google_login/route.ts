// app/api/google-login/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/supabaseClient';


export async function GET() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/searchMap`, // customize your redirect
        },
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

  // Redirect user to Google's OAuth URL
    return NextResponse.redirect(data.url);
}
