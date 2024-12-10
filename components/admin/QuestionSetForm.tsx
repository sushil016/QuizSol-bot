"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Trash2, Plus } from "lucide-react"
import { SetStatus } from "@prisma/client"

interface SubCategory {
  id: string
  name: string
  year: number
  category: {
    name: string
  }
}

interface Question {
  questionText: string
  options: string[]
  correctAnswer: number
  explanation?: string
  questionImage?: File
  explanationImage?: File
  category: string
  subCategory: string
  difficulty: string
}

interface Category {
  id: string
  name: string
}

export function QuestionSetForm() {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subCategoryId, setSubCategoryId] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: -1,
    explanation: "",
    questionImage: undefined,
    explanationImage: undefined,
    category: "",
    subCategory: "",
    difficulty: "MEDIUM"
  })
  const { toast } = useToast()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchSubCategories()
    fetchCategories()
  }, [])

  const fetchSubCategories = async () => {
    try {
      const response = await fetch("/api/admin/sub-categories")
      if (!response.ok) throw new Error("Failed to fetch subcategories")
      const data = await response.json()
      setSubCategories(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch subcategories",
        variant: "error",
      })
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/exam-categories")
      if (!response.ok) throw new Error("Failed to fetch categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "error",
      })
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options]
    newOptions[index] = value
    setCurrentQuestion({ ...currentQuestion, options: newOptions })
  }

  const handleAddQuestion = () => {
    // Validate current question
    if (!currentQuestion.questionText || 
        currentQuestion.options.some(opt => !opt) || 
        currentQuestion.correctAnswer === -1 ||
        !currentQuestion.category) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "error",
      })
      return
    }

    setQuestions([...questions, currentQuestion])
    // Reset form for next question
    setCurrentQuestion({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: -1,
      explanation: "",
      questionImage: undefined,
      explanationImage: undefined,
      category: currentQuestion.category, // Keep the same category
      subCategory: currentQuestion.subCategory, // Keep the same subcategory
      difficulty: "MEDIUM"
    })
  }

  const handleQuestionRemove = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSaveAsDraft = async (status: SetStatus) => {
    await handleSubmit(status)
  }

  const handlePublish = async (status: SetStatus) => {
    await handleSubmit(status)
  }

  const handleSubmit = async (status: SetStatus) => {
    if (!title || !subCategoryId || questions.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields and add at least one question",
        variant: "error",
      })
      return
    }

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("subCategoryId", subCategoryId)
      formData.append("status", status)
      formData.append("questions", JSON.stringify(questions))

      const response = await fetch("/api/admin/question-sets", {
        method: "POST",
        body: formData,
      })
      
      if (!response.ok) throw new Error("Failed to create question set")
      
      toast({
        title: "Success",
        description: `Question set ${status === "DRAFT" ? "saved as draft" : "published"} successfully`,
      })
      
      if (status === "PUBLISHED") {
        setTitle("")
        setDescription("")
        setSubCategoryId("")
        setQuestions([])
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create question set",
        variant: "error",
      })
    }
  }

  const handleImageUpload = (type: 'question' | 'explanation', file: File) => {
    if (type === 'question') {
      setCurrentQuestion({ ...currentQuestion, questionImage: file })
    } else {
      setCurrentQuestion({ ...currentQuestion, explanationImage: file })
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Select value={subCategoryId} onValueChange={setSubCategoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Subcategory" />
          </SelectTrigger>
          <SelectContent>
            {subCategories.map((subCategory) => (
              <SelectItem key={subCategory.id} value={subCategory.id}>
                {subCategory.category.name} - {subCategory.name} ({subCategory.year})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Input
          placeholder="Question Set Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Question Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Question Text</Label>
            <Textarea
              value={currentQuestion.questionText}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
              placeholder="Enter question text"
            />
          </div>

          <div className="space-y-2">
            <Label>Question Image (Optional)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageUpload('question', file)
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="space-y-2">
                <Label>Option {String.fromCharCode(65 + index)}</Label>
                <Input
                  value={currentQuestion.options[index]}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Correct Answer</Label>
            <Select
              value={currentQuestion.correctAnswer === -1 ? "" : currentQuestion.correctAnswer.toString()}
              onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, correctAnswer: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select correct answer" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3].map((index) => (
                  <SelectItem key={index} value={index.toString()}>
                    Option {String.fromCharCode(65 + index)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={currentQuestion.category}
              onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Difficulty</Label>
            <Select
              value={currentQuestion.difficulty}
              onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, difficulty: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EASY">Easy</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HARD">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Explanation (Optional)</Label>
            <Textarea
              value={currentQuestion.explanation}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
              placeholder="Add explanation"
            />
          </div>

          <div className="space-y-2">
            <Label>Explanation Image (Optional)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageUpload('explanation', file)
              }}
            />
          </div>

          <Button onClick={handleAddQuestion} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Question
          </Button>
        </CardContent>
      </Card>

      {/* Questions List */}
      {questions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Added Questions ({questions.length})</h3>
          {questions.map((question, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <p className="font-medium">Q{index + 1}: {question.questionText}</p>
                    <div className="mt-2 space-y-1">
                      {question.options.map((option, optIndex) => (
                        <p key={optIndex} className={optIndex === question.correctAnswer ? "text-green-600" : ""}>
                          {String.fromCharCode(65 + optIndex)}: {option}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Category: {question.category} | Difficulty: {question.difficulty}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuestionRemove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex space-x-4">
        <Button variant="outline" onClick={() => handleSaveAsDraft("DRAFT" as SetStatus)}>
          Save as Draft
        </Button>
        <Button onClick={() => handlePublish("PUBLISHED" as SetStatus)}>
          Publish
        </Button>
      </div>
    </div>
  )
} 