import { NextRequest, NextResponse } from 'next/server';
import { resolveStreamingUrl } from '@/lib/otakudesu';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dataContent: string }> }
) {
  try {
    const { dataContent } = await params;
    const data = await resolveStreamingUrl(dataContent);
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
        statusCode: 502,
        message: error.message || 'Failed to resolve streaming URL',
        timestamp: new Date().toISOString(),
      },
      { status: 502 }
    );
  }
}
