import { NextResponse } from 'next/server';
import { getSubmissions } from '../submissions/route';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  
  const allSubmissions = getSubmissions();
  const totalCount = allSubmissions.length;
  const totalPages = Math.ceil(totalCount / limit);
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = allSubmissions.slice(start, end);

  return NextResponse.json({
    data: paginatedData,
    meta: {
      page,
      limit,
      totalCount,
      totalPages,
    }
  });
}

