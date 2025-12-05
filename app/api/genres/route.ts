import { NextResponse } from 'next/server';
import { getGenres } from '@/lib/otakudesu';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const genres = await getGenres();
    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: 'OK',
      data: { genres },
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
