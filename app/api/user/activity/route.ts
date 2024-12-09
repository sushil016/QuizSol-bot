import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import * as z from 'zod';

const activitySchema = z.object({
  questionId: z.string(),
  isCorrect: z.boolean(),
  timeTaken: z.number(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const json = await req.json();
    const body = activitySchema.parse(json);

    const activity = await prisma.userActivity.create({
      data: {
        ...body,
        userId: session.user.id,
      },
    });

    return NextResponse.json(activity);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const activities = await prisma.userActivity.findMany({
      where: { userId: session.user.id },
      include: { question: true },
      orderBy: { attemptedAt: 'desc' },
    });

    return NextResponse.json(activities);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}