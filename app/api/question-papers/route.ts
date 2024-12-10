import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const examType = searchParams.get('examType');

    // Check if examType is provided
    if (!examType) {
      return NextResponse.json(
        { error: 'examType parameter is required' },
        { status: 400 }
      );
    }

    // Update validExamTypes to match the frontend options
    const validExamTypes = ['NEET', 'JEE', 'GATE'];
    if (!validExamTypes.includes(examType)) {
      return NextResponse.json(
        { error: 'Invalid examType provided' },
        { status: 400 }
      );
    }

    const papers = await prisma.questionPaper.findMany({
      where: {
        examType: examType as any,
      },
      orderBy: [
        { year: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    // Return empty array if no papers found instead of throwing an error
    return NextResponse.json(papers || []);
    
  } catch (error) {
    console.error('Error fetching question papers:', error);
    
    return NextResponse.json(
      { error: 'Error fetching question papers', details: (error as Error).message },
      { status: 500 }
    );
  }
} 