import { NextResponse } from 'next/server';

// In-memory storage for demo purposes
// In a real app, this would be a database
let submissions: any[] = [
  {
    id: '1',
    displayName: 'huycao',
    favoriteModel: 'GPT-5.1 Codex High Fast',
    cursorPlan: 'Ultra',
    country: 'Vietnam',
    favoriteMode: 'Plan',
    note: 'Cursor has completely changed my workflow. I spend 90% of my time in Plan mode now.',
    createdAt: new Date('2025-11-29T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    displayName: 'alex_dev',
    favoriteModel: 'Claude 3.5 Sonnet',
    cursorPlan: 'Pro',
    country: 'USA',
    favoriteMode: 'Agent',
    note: '',
    createdAt: new Date('2025-11-28T15:30:00Z').toISOString(),
  },
  {
    id: '3',
    displayName: 'sarah_j',
    favoriteModel: 'GPT-4o',
    cursorPlan: 'Business',
    country: 'UK',
    favoriteMode: 'Ask',
    note: 'Love the codebase indexing feature.',
    createdAt: new Date('2025-11-28T09:15:00Z').toISOString(),
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.favoriteModel || !body.cursorPlan || !body.country || !body.favoriteMode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newSubmission = {
      id: Math.random().toString(36).substring(7),
      displayName: body.displayName || 'Anonymous dev',
      favoriteModel: body.favoriteModel,
      cursorPlan: body.cursorPlan,
      country: body.country,
      favoriteMode: body.favoriteMode,
      note: body.note || '',
      createdAt: new Date().toISOString(),
    };

    submissions.unshift(newSubmission);

    return NextResponse.json({ success: true, data: newSubmission });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Export submissions for other routes to use
export function getSubmissions() {
  return submissions;
}

