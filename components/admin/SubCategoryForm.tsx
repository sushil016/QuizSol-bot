"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Category {
  id: string
  name: string
}

export function SubCategoryForm() {
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState("")
  const [year, setYear] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchCategories()
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/sub-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          year: parseInt(year),
          categoryId,
        }),
      })
      
      if (!response.ok) throw new Error("Failed to create subcategory")
      
      toast({
        title: "Success",
        description: "Subcategory created successfully",
      })
      
      setName("")
      setYear("")
      setCategoryId("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create subcategory",
        variant: "error",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select value={categoryId} onValueChange={setCategoryId}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Input
        placeholder="Subcategory Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      
      <Input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      
      <Button type="submit">Create Subcategory</Button>
    </form>
  )
} 