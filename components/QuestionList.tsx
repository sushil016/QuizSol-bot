"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Question {
  id: string
  text: string
  category: string
  difficulty: string
  usageCount: number
}

export function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [difficulty, setDifficulty] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    fetchQuestions()
  }, [search, category, difficulty])

  const fetchQuestions = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append("search", search)
      if (category) params.append("category", category)
      if (difficulty) params.append("difficulty", difficulty)

      const response = await fetch(`/api/admin/questions?${params.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch questions")
      const data = await response.json()
      setQuestions(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch questions",
        variant: "error",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/questions/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete question")
      fetchQuestions()
      toast({
        title: "Success",
        description: "Question deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete question",
        variant: "error",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input 
          type="text" 
          placeholder="Search questions..." 
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex space-x-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="NEET">NEET</SelectItem>
              <SelectItem value="JEE">JEE</SelectItem>
              <SelectItem value="GATE">GATE</SelectItem>
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Usage Count</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell>{question.text}</TableCell>
              <TableCell>{question.category}</TableCell>
              <TableCell>{question.difficulty}</TableCell>
              <TableCell>{question.usageCount}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(question.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

