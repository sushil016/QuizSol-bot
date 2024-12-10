import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function CategoryAccuracy() {
  const data = [
    { category: "Math", accuracy: 75 },
    { category: "Physics", accuracy: 68 },
    { category: "Chemistry", accuracy: 82 },
    { category: "Biology", accuracy: 79 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Accuracy</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Bar dataKey="accuracy" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

