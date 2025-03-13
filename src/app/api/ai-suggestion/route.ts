// File: app/api/ai-suggestion/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Generate a simple suggestion based on the message
    // In a real app, you might use an actual AI service here
    let suggestion = '';
    
    if (message.length < 20) {
      suggestion = "I'd like to discuss a potential project opportunity. Could we schedule a call to discuss details? I'm available next week and looking forward to hearing from you.";
    } else if (message.includes('project')) {
      suggestion = `${message.trim()}\n\nI'm excited about this project opportunity and would love to discuss timeline and budget considerations. I'm available for a call at your convenience.`;
    } else if (message.includes('question')) {
      suggestion = `${message.trim()}\n\nI'd appreciate your insights on this matter. Looking forward to your response!`;
    } else {
      suggestion = `${message.trim()}\n\nI look forward to hearing back from you soon. Thanks for your time and consideration.`;
    }

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('AI suggestion error:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestion' },
      { status: 500 }
    );
  }
}