import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const examType = searchParams.get('examType');

    const papers = await prisma.questionPaper.findMany({
      where: {
        examType: examType as any,
      },
      orderBy: [
        { year: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json(papers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching question papers' },
      { status: 500 }
    );
  }
} 