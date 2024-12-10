"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ExamCategoryForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/exam-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      })
      
      if (!response.ok) throw new Error("Failed to create category")
      
      toast({
        title: "Success",
        description: "Category created successfully",
      })
      
      setName("")
      setDescription("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "error",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Category Name (e.g., NEET, JEE Mains)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Textarea
          placeholder="Category Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button type="submit">Create Category</Button>
    </form>
  )
} 