import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function ExamList() {
  const exams = [
    { id: 1, name: "NEET", subcategories: ["2022", "2023"], questionCount: 1000 },
    { id: 2, name: "JEE", subcategories: ["Main", "Advanced"], questionCount: 1500 },
    // Add more exam data as needed
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Exam Name</TableHead>
          <TableHead>Subcategories</TableHead>
          <TableHead>Question Count</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exams.map((exam) => (
          <TableRow key={exam.id}>
            <TableCell>{exam.name}</TableCell>
            <TableCell>{exam.subcategories.join(", ")}</TableCell>
            <TableCell>{exam.questionCount}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2">Edit</Button>
              <Button variant="destructive" size="sm">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

