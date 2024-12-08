import { format } from 'date-fns';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
}

interface RecentActivityProps {
  activities?: Activity[];
}

export function RecentActivity({ activities = [] }: RecentActivityProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4">
          <div className="flex-1">
            <p className="text-sm font-medium">{activity.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(activity.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
      {activities.length === 0 && (
        <p className="text-sm text-gray-500">No recent activity</p>
      )}
    </div>
  );
}