"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface SubCategory {
  id: string
  name: string
  year: number
}

interface Category {
  id: string
  name: string
  subCategories: SubCategory[]
}

export function ExamSelector() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/exam-categories")
      if (!response.ok) throw new Error("Failed to fetch categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch exam categories",
        variant: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleSubCategorySelect = async (subCategoryId: string) => {
    try {
      const response = await fetch(`/api/questions/subcategory/${subCategoryId}`)
      if (!response.ok) throw new Error("Failed to fetch questions")
      const data = await response.json()

      if (data.questions.length === 0) {
        toast({
          title: "No Questions Available",
          description: "There are no questions available for this category yet.",
          variant: "error",
        })
        return
      }

      // Store questions in localStorage for smooth pagination
      localStorage.setItem('currentQuestions', JSON.stringify(data.questions))
      router.push(`/exam/practice/${subCategoryId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch questions",
        variant: "error",
      })
    }
  }

  if (loading) {
    return <div>Loading...</div> // You can replace this with a proper loading component
  }

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  selectedCategory === category.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedCategoryData && selectedCategoryData.subCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {selectedCategoryData.subCategories.map((sub) => (
            <Button
              key={sub.id}
              variant="outline"
              onClick={() => handleSubCategorySelect(sub.id)}
            >
              {sub.name} ({sub.year})
            </Button>
          ))}
        </motion.div>
      )}

      {selectedCategoryData && selectedCategoryData.subCategories.length === 0 && (
        <p className="text-center text-muted-foreground">
          No subcategories available for this category
        </p>
      )}
    </div>
  )
} 