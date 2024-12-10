import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    { id: 1, user: "John Doe", action: "signed up", time: "2 hours ago" },
    { id: 2, user: "Jane Smith", action: "uploaded a question", time: "4 hours ago" },
    { id: 3, user: "Mike Johnson", action: "completed an exam", time: "1 day ago" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex justify-between items-center">
              <span>{activity.user} {activity.action}</span>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

