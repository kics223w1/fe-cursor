import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://be-cursor.vercel.app';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '20';
  const sortBy = searchParams.get('sortBy') || 'createdAtDesc';

  try {
    // Backend uses pageSize instead of limit
    const res = await fetch(`${API_BASE_URL}/api/leaderboard?page=${page}&pageSize=${limit}&sortBy=${sortBy}`, {
       cache: 'no-store' 
    });
    
    if (!res.ok) {
        throw new Error('Failed to fetch leaderboard');
    }

    const data = await res.json();
    
    return NextResponse.json({
      data: data.items,
      meta: {
        page: data.page,
        limit: data.pageSize,
        totalCount: data.totalCount,
        totalPages: data.totalPages,
      }
    });
  } catch (error) {
    return NextResponse.json(
        { error: 'Failed to fetch leaderboard' },
        { status: 500 }
    );
  }
}
