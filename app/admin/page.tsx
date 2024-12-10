import { RecentActivity } from "@/components/RecentActivity"
import { Statistics } from "@/components/Statistics"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">10,245</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Questions Uploaded</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5,678</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">15</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,234</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <Statistics />
      </div>
    </div>
  )
}

