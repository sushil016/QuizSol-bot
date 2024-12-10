import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function AverageSolvingTime() {
  const data = [
    { question: "Q1", time: 45 },
    { question: "Q2", time: 60 },
    { question: "Q3", time: 30 },
    { question: "Q4", time: 75 },
    { question: "Q5", time: 50 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Solving Time (seconds)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="question" />
            <YAxis />
            <Line type="monotone" dataKey="time" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

