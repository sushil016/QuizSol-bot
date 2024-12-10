import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function LeastAttemptedQuestions() {
  const questions = [
    { id: 1, title: "What is the melting point of tungsten?", attempts: 50, category: "Chemistry" },
    { id: 2, title: "Who wrote 'The Brothers Karamazov'?", attempts: 75, category: "Literature" },
    { id: 3, title: "What is the capital of Burkina Faso?", attempts: 100, category: "Geography" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Least Attempted Questions</CardTitle>
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

