"use client"

import { useEffect, useState } from "react"
import { QuestionPractice } from "@/components/QuestionPractice"
import { useRouter } from "next/navigation"

export default function PracticePage({ params }: { params: { subCategoryId: string } }) {
  const [questions, setQuestions] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedQuestions = localStorage.getItem('currentQuestions')
    if (!storedQuestions) {
      router.push('/exam')
      return
    }
    setQuestions(JSON.parse(storedQuestions))
  }, [router])

  if (questions.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <QuestionPractice questions={questions} />
    </div>
  )
} 