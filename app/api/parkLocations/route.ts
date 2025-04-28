import { NextResponse } from 'next/server';
import { supabase } from '@/supabaseClient';

/**
 * Handle GET requests to the /api/parkLocations endpoint. Returns the directions from coord1 to coord2
 *
 * @param {Request} request - The incoming request object.
 * @return {Promise<NextResponse>} The response object.
 */
export async function GET(request: Request) {
  try {
    const { data: park } = await supabase.from('park').select();
    return NextResponse.json(park, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
