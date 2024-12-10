import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Statistics() {
  const stats = [
    { title: "Most Solved Paper", value: "NEET 2022" },
    { title: "Average Time Spent", value: "45 minutes" },
    { title: "User Accuracy", value: "72%" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {stats.map((stat, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{stat.title}</span>
              <span className="font-bold">{stat.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

