import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkAdmin } from '@/middleware/adminAuth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(await checkAdmin(session))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { examType, year, pdfUrl, title, isPractice } = data;

    const questionPaper = await prisma.questionPaper.create({
      data: {
        examType,
        year,
        pdfUrl,
        title,
        isPractice,
        userId: session.user.id,
      },
    });

    return NextResponse.json(questionPaper);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating question paper' }, { status: 500 });
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