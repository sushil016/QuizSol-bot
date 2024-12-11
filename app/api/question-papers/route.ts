import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryName = searchParams.get('categoryName');

    if (!categoryName) {
      return NextResponse.json(
        { error: 'categoryName parameter is required' },
        { status: 400 }
      );
    }

    const papers = await prisma.questionPaper.findMany({
      where: {
        subCategory: {
          category: {
            name: categoryName
          }
        }
      },
      include: {
        subCategory: {
          include: {
            category: true
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json(papers || []);
  } catch (error) {
    console.error('Error fetching question papers:', error);
    return NextResponse.json(
      { error: 'Error fetching question papers' },
      { status: 500 }
    );
  }
} 