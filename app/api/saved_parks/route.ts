import { NextResponse } from 'next/server';
import { supabase } from '@/supabaseClient';
const USER_ID = "dffeaf96-64a3-4bbc-a8d6-c90e89658aca";
/**
 * Handle GET requests to the /api/parkLocations endpoint.
 *
 * @param {Request} request - The incoming request object.
 * @return {Promise<NextResponse>} The response object.
 */
export async function GET(request: Request) {
    try {
        const { data:park, error } = await supabase
        .from("saved_park")
        .select(
        `
        park:park (
            uuid:park,
            name,
            rules
        )
        `
        )
        .eq("user", USER_ID);
        return NextResponse.json(park, { status: 200 });
    } catch (error) {
        return NextResponse.json(
        { error: 'Failed to fetch data' },
        { status: 500 }
        );
    }
}