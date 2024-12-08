import { Progress } from '@/components/ui/progress';

interface CategoryData {
  category: string;
  score: number;
  total: number;
}

interface CategoryBreakdownProps {
  data?: CategoryData[];
}

export function CategoryBreakdown({ data = [] }: CategoryBreakdownProps) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.category} className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{item.category}</span>
            <span className="text-sm text-gray-500">
              {Math.round((item.score / item.total) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-primary rounded-full"
              style={{
                width: `${(item.score / item.total) * 100}%`,
              }}
            />
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <p className="text-sm text-gray-500">No category data available</p>
      )}
    </div>
  );
}