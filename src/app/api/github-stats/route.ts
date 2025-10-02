// src/app/api/github-stats/route.ts

import { NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/common/lib/github-service';

export async function GET() {
  try {
    const stats = await fetchGitHubStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error in GitHub stats API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    );
  }
}
