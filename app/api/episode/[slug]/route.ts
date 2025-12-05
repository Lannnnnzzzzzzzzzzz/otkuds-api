import { NextRequest, NextResponse } from 'next/server';
import { getEpisodeDetail } from '@/lib/otakudesu';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await getEpisodeDetail(slug);
    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: 'OK',
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    const statusCode = error.message.includes('tidak ditemukan') ? 404 : 500;
    return NextResponse.json(
      {
        success: false,
        statusCode,
        message: error.message || 'Internal Server Error',
        timestamp: new Date().toISOString(),
      },
      { status: statusCode }
    );
  }
}
