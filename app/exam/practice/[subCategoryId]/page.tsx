"use client"

import { useEffect, useState } from "react"
import { QuestionPractice } from "@/components/QuestionPractice"
import { useRouter } from "next/navigation"

export default function PracticePage({ params }: { params: { subCategoryId: string } }) {
  const [questionSet, setQuestionSet] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedQuestions = localStorage.getItem('currentQuestions')
    if (!storedQuestions) {
      router.push('/exam')
      return
    }
    setQuestionSet({
      questions: JSON.parse(storedQuestions),
      totalTime: 60 // Add any other required questionSet properties
    })
  }, [router])

  if (!questionSet) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <QuestionPractice questionSet={questionSet} />
    </div>
  )
} 