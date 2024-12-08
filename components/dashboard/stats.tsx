import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Target, Clock, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    totalQuizzes: number;
    correctAnswers: number;
    averageScore: number;
    quizzesTaken: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <>
      <StatCard title="Total Quizzes" value={stats?.totalQuizzes || 0} />
      <StatCard title="Correct Answers" value={stats?.correctAnswers || 0} />
      <StatCard 
        title="Average Score" 
        value={`${stats?.averageScore || 0}%`} 
      />
      <StatCard title="Quizzes Taken" value={stats?.quizzesTaken || 0} />
    </>
  );
}

function StatCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}