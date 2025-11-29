import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://be-cursor.vercel.app';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const res = await fetch(`${API_BASE_URL}/api/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to submit' },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
