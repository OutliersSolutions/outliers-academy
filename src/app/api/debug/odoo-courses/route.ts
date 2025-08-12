import { NextRequest, NextResponse } from 'next/server';
import { odooExecuteKw } from '@/lib/odooClient';

export async function GET() {
  try {
    // Check all slide.channel records
    const allChannels = await odooExecuteKw('slide.channel', 'search_read', [[]], {
      fields: ['id', 'name', 'description', 'website_published', 'product_id'],
      limit: 10
    });

    // Check if there are any records at all
    const totalCount = await odooExecuteKw('slide.channel', 'search_count', [[]]);
    
    // Check published records
    const publishedCount = await odooExecuteKw('slide.channel', 'search_count', [
      [['website_published', '=', true]]
    ]);

    return NextResponse.json({
      success: true,
      debug: {
        totalChannels: totalCount,
        publishedChannels: publishedCount,
        sampleChannels: allChannels,
        odooConnected: true
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      odooConnected: false
    });
  }
}