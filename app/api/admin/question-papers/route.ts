import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkAdmin } from '@/middleware/adminAuth';


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    
    // Get user ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const paper = await prisma.questionPaper.create({
      data: {
        ...body,
        userId: user.id,
      },
    });

    return NextResponse.json(paper);
  } catch (error) {
    console.error('Error creating question paper:', error);
    return NextResponse.json(
      { 
        error: 'Error creating question paper',
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subCategoryId = searchParams.get('subCategoryId');

    const where = subCategoryId ? { subCategoryId } : {};

    const papers = await prisma.questionPaper.findMany({
      where,
      include: {
        subCategory: {
          include: {
            category: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(papers);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 