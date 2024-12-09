import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';


export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Fetch user's activities
    const activities = await prisma.userActivity.findMany({
      where: { userId },
      include: { question: true },
      orderBy: { attemptedAt: 'desc' },
    });

    // Calculate stats
    const totalQuestions = activities.length;
    const correctAnswers = activities.filter(a => a.isCorrect).length;
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    const averageTime = totalQuestions > 0
      ? activities.reduce((acc, curr) => acc + curr.timeTaken, 0) / totalQuestions
      : 0;

    // Calculate streak
    let streak = 0;
    for (const activity of activities) {
      if (activity.isCorrect) streak++;
      else break;
    }

    // Get category breakdown
    const categoryStats = await prisma.question.groupBy({
      by: ['category'],
      _count: {
        id: true,
      },
    });

    const categoryBreakdown = await Promise.all(
      categoryStats.map(async (stat) => {
        const categoryActivities = activities.filter(
          a => a.question.category === stat.category
        );

        return {
          name: stat.category,
          attempted: categoryActivities.length,
          correct: categoryActivities.filter(a => a.isCorrect).length,
          total: stat._count.id,
        };
      })
    );

    // Get recent activity
    const recentActivity = activities
      .slice(0, 5)
      .map(activity => ({
        id: activity.id,
        questionText: activity.question.questionText,
        isCorrect: activity.isCorrect,
        attemptedAt: activity.attemptedAt,
      }));

    return NextResponse.json({
      totalQuestions,
      accuracy,
      averageTime,
      streak,
      categoryBreakdown,
      recentActivity,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}