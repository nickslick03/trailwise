import { NextResponse } from 'next/server';

/**
 * Handle POST requests to the /api/directions endpoint. Returns the directions from coord1 to coord2
 *
 * @param {Request} request - The incoming request object.
 * @return {Promise<NextResponse>} The response object.
 */
export async function POST(request: Request) {
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
