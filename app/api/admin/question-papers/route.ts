import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkAdmin } from '@/middleware/adminAuth';


export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !(await checkAdmin(session))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { examType, year, pdfUrl, title, isPractice } = data;

    // // Validate required fields
    // if (!examType || !pdfUrl || !title) {
    //   return NextResponse.json(
    //     { error: 'Missing required fields' },
    //     { status: 400 }
    //   );
    // }

    // // Validate exam type
    // if (!VALID_EXAM_TYPES.includes(examType)) {
    //   return NextResponse.json(
    //     { error: 'Invalid exam type' },
    //     { status: 400 }
    //   );
    // }

    // // Validate year if it's a PYQ (not practice paper)
    // if (!isPractice && (!year || isNaN(year))) {
    //   return NextResponse.json(
    //     { error: 'Year is required for previous year questions' },
    //     { status: 400 }
    //   );
    // }

    // Create question paper
    const questionPaper = await prisma.questionPaper.create({
      data: {
        examType,
        year: isPractice ? null : Number(year),
        pdfUrl,
        title,
        isPractice,
        userId: session.user.id,
      },
    });

    return NextResponse.json(questionPaper);
  } catch (error) {
    console.error('Error creating question paper:', error);
    return NextResponse.json(
      { 
        error: 'Error creating question paper',
        details: (error as Error).message 
      }, 
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(await checkAdmin(session))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const papers = await prisma.questionPaper.findMany({
      orderBy: [
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