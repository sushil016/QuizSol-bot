import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';


export function UserList() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", registrationDate: "2023-01-15", questionsAnswered: 150, accuracy: "75%" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", registrationDate: "2023-02-20", questionsAnswered: 200, accuracy: "80%" },
    // Add more user data as needed
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Registration Date</TableHead>
          <TableHead>Questions Answered</TableHead>
          <TableHead>Accuracy</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.registrationDate}</TableCell>
            <TableCell>{user.questionsAnswered}</TableCell>
            <TableCell>{user.accuracy}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2">View</Button>
              <Button variant="destructive" size="sm">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

