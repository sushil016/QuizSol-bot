"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

interface Question {
  id: string
  questionText: string
  options: string[]
  correctAnswer: number
  explanation?: string
  questionImageUrl?: string
  explanationImageUrl?: string
}

interface QuestionSetData {
  id: string
  title: string
  questions: Question[]
  subCategory: {
    name: string
    year: number
    category: {
      name: string
    }
  }
}

export function QuestionInterface({ questionSetId }: { questionSetId: string }) {
  const [questionSet, setQuestionSet] = useState<QuestionSetData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    fetchQuestionSet()
  }, [questionSetId])

  useEffect(() => {
    if (questionSet) {
      const newProgress = ((currentQuestionIndex + 1) / questionSet.questions.length) * 100
      setProgress(newProgress)
    }
  }, [currentQuestionIndex, questionSet])

  const fetchQuestionSet = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/question-sets/${questionSetId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch question set')
      }

      setQuestionSet(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex)
    setShowExplanation(true)

    if (questionSet && currentQuestionIndex < questionSet.questions.length - 1) {
      setTimeout(() => {
        handleNext()
      }, 2000)
    }
  }

  const handleNext = () => {
    if (!questionSet) return
    if (currentQuestionIndex < questionSet.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      handleCompletion()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleCompletion = () => {
    router.push('/exam/completed')
  }

  if (loading) {
    return <div>Loading question set...</div>
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500">Error</h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (!questionSet) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Question Set Not Found</h2>
        <p className="text-muted-foreground">
          The requested question set could not be found or is not published yet.
        </p>
      </div>
    )
  }

  const currentQuestion = questionSet.questions[currentQuestionIndex]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="sticky top-0 bg-background pt-4 pb-2 space-y-4 z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {questionSet.subCategory.category.name} - {questionSet.subCategory.name} ({questionSet.subCategory.year})
          </h2>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questionSet.questions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestion.questionText}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuestion.questionImageUrl && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={currentQuestion.questionImageUrl}
                  alt="Question"
                  className="max-w-full rounded-lg"
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className={`w-full justify-start ${
                        showExplanation && index === currentQuestion.correctAnswer
                          ? "ring-2 ring-green-500"
                          : ""
                      } ${
                        showExplanation && selectedAnswer === index && selectedAnswer !== currentQuestion.correctAnswer
                          ? "ring-2 ring-red-500"
                          : ""
                      }`}
                      onClick={() => !showExplanation && handleAnswerSelect(index)}
                      disabled={showExplanation}
                    >
                      {String.fromCharCode(65 + index)}. {option}
                    </Button>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4 p-4 bg-muted rounded-lg"
                  >
                    <h3 className="font-semibold mb-2">Explanation</h3>
                    <p>{currentQuestion.explanation}</p>
                    {currentQuestion.explanationImageUrl && (
                      <img
                        src={currentQuestion.explanationImageUrl}
                        alt="Explanation"
                        className="max-w-full mt-2 rounded-lg"
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between sticky bottom-0 bg-background py-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="w-[100px]"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!showExplanation}
          className="w-[100px]"
        >
          {currentQuestionIndex === questionSet.questions.length - 1 ? (
            "Finish"
          ) : (
            <>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 