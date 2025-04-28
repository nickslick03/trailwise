import { NextResponse } from 'next/server';

/**
 * Handle GET requests to the /api/parkLocations endpoint. Returns the directions from coord1 to coord2
 *
 * @param {Request} request - The incoming request object.
 * @return {Promise<NextResponse>} The response object.
 */
export async function GET(request: Request) {
  const body = await request.json();

  try {
    const resp = null;
    const json = await resp.json();
    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
