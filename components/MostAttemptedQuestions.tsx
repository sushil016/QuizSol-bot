import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function MostAttemptedQuestions() {
  const questions = [
    { id: 1, title: "What is the capital of France?", attempts: 1500, category: "General Knowledge" },
    { id: 2, title: "What is the chemical symbol for water?", attempts: 1200, category: "Chemistry" },
    { id: 3, title: "What is the largest planet in our solar system?", attempts: 1000, category: "Astronomy" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Attempted Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Attempts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>{question.title}</TableCell>
                <TableCell>{question.category}</TableCell>
                <TableCell>{question.attempts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

