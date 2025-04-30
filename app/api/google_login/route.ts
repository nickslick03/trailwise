// app/api/login/route.ts

import { supabase } from '@/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const redirectTo = `${new URL(request.url).origin}/searchMap`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
    });

    if (error || !data.url) {
        return NextResponse.json({ error: error?.message || 'No URL returned' }, { status: 500 });
    }

    return NextResponse.redirect(data.url);
}
