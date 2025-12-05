import { NextRequest, NextResponse } from 'next/server';
import { getAnimeByGenre } from '@/lib/otakudesu';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ genre: string }> }
) {
  try {
    const { genre } = await params;
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');

    const data = await getAnimeByGenre(genre, page);
    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: 'OK',
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: error.message || 'Internal Server Error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
