import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/src/lib/prisma';
import { questionSchema, questionQuerySchema } from '@/src/lib/validations/question';
import { authOptions } from '@/src/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const json = await req.json();
    const body = questionSchema.parse(json);

    const question = await prisma.question.create({
      data: {
        ...body,
        options: JSON.stringify(body.options),
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = questionQuerySchema.parse({
      category: searchParams.get('category'),
      subCategory: searchParams.get('subCategory'),
      difficulty: searchParams.get('difficulty'),
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 10,
      search: searchParams.get('search'),
    });

    const where = {
      ...(query.category && { category: query.category }),
      ...(query.subCategory && { subCategory: query.subCategory }),
      ...(query.difficulty && { difficulty: query.difficulty }),
      ...(query.search && {
        questionText: {
          contains: query.search,
          mode: 'insensitive',
        },
      }),
    };

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.question.count({ where }),
    ]);

    return NextResponse.json({
      questions: questions.map(q => ({
        ...q,
        options: JSON.parse(q.options),
      })),
      total,
      page: query.page,
      totalPages: Math.ceil(total / query.limit),
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}