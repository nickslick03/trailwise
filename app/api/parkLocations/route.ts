import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Handle GET requests to the /api/parkLocations endpoint. Returns the directions from coord1 to coord2
 *
 * @param {Request} request - The incoming request object.
 * @return {Promise<NextResponse>} The response object.
 */
export async function GET(request: Request) {
  const body = await request.json();

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_KEY || ''
    );
    const { data: park } = await supabase.from("park").select();
    return NextResponse.json(park, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
