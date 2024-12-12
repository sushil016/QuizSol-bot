"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Info 
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import { cn } from "@/lib/ut"
import { Question, QuestionSet, ExamResult } from "@/types/index"

export function QuestionPractice({ 
  questionSet 
}: { 
  questionSet: QuestionSet 
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(questionSet.totalTime * 60) // Convert to seconds
  const [answeredQuestions, setAnsweredQuestions] = useState<{[key: number]: number}>({})
  const [skippedQuestions, setSkippedQuestions] = useState<number[]>([])
  
  const router = useRouter()
  const questions = questionSet.questions

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          handleCompletion()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Progress and Navigation Effects
  useEffect(() => {
    const newProgress = ((currentQuestionIndex + 1) / questions.length) * 100
    setProgress(newProgress)
  }, [currentQuestionIndex, questions.length])

  // Handler for answer selection
  const handleAnswerSelect = (optionIndex: number) => {
    if (showExplanation) return

    setSelectedAnswer(optionIndex)
    setShowExplanation(true)
    
    // Track answered questions
    setAnsweredQuestions(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }))
  }

  // Skip Question Handler
  const handleSkipQuestion = () => {
    setSkippedQuestions(prev => [...prev, currentQuestionIndex])
    handleNext()
  }

  // Navigation Handlers
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
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

  // Completion Handler
  const handleCompletion = () => {
    const result: ExamResult = calculateResult()
    localStorage.setItem('examResult', JSON.stringify(result))
    router.push('/exam/completed')
  }

  // Result Calculation
  const calculateResult = (): ExamResult => {
    let correctAnswers = 0
    let incorrectAnswers = 0

    Object.entries(answeredQuestions).forEach(([index, selectedAnswer]) => {
      const question = questions[parseInt(index)]
      if (selectedAnswer === question.correctAnswer) {
        correctAnswers++
      } else {
        incorrectAnswers++
      }
    })

    return {
      totalQuestions: questions.length,
      answeredQuestions,
      skippedQuestions,
      correctAnswers,
      incorrectAnswers,
      unattemptedQuestions: questions.length - Object.keys(answeredQuestions).length
    }
  }

  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  // Sidebar Component
  const QuestionSidebar = () => (
    <div className="w-64 bg-muted p-4 space-y-4 overflow-y-auto">
      <h3 className="text-lg font-semibold">Question Navigation</h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((q, index) => (
          <Button
            key={index}
            size="sm"
            variant={
              skippedQuestions.includes(index) ? "destructive" : 
              answeredQuestions[index] !== undefined ? "default" : 
              currentQuestionIndex === index ? "default" : "outline"
            }
            onClick={() => {
              setCurrentQuestionIndex(index)
              setSelectedAnswer(null)
              setShowExplanation(false)
            }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )

  const currentQuestion = questions[currentQuestionIndex]
  const parsedOptions = JSON.parse(currentQuestion.options)

  return (
    <div className="flex">
      {/* Sidebar */}
      <QuestionSidebar />
      
      <div className="flex-1 space-y-6 max-w-4xl mx-auto p-4">
        {/* Header with Timer and Progress */}
        <div className="sticky top-0 bg-background pt-4 pb-2 space-y-4 z-10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {currentQuestion.categoryName} - {currentQuestion.subCategoryName} ({currentQuestion.subCategoryYear})
            </h2>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
          
          {/* Timer */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              <span className="font-semibold">{formatTime(timeRemaining)}</span>
            </div>
            <Progress value={progress} className="h-2 w-64" />
          </div>
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Image
                      src={currentQuestion.questionImageUrl}
                      alt="Question"
                      width={800}
                      height={600}
                      className="max-w-full rounded-lg"
                      priority
                    />
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {parsedOptions.map((option: string, index: number) => (
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
                        onClick={() => handleAnswerSelect(index)}
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
                        <Image
                          src={currentQuestion.explanationImageUrl}
                          alt="Explanation"
                          width={800}
                          height={600}
                          className="max-w-full mt-2 rounded-lg"
                          priority
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex space-x-4 mt-4">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <Button 
            variant="outline" 
            onClick={handleSkipQuestion}
            className="flex-1"
          >
            Skip Question
          </Button>

          <Button 
            variant="outline"
            onClick={() => setShowExplanation(true)}
            disabled={!selectedAnswer}
            className="flex-1"
          >
            <Info className="mr-2 h-4 w-4" /> 
            View Explanation
          </Button>

          <Button
            onClick={handleNext}
            disabled={!showExplanation}
            className="flex-1"
          >
            {currentQuestionIndex === questions.length - 1 ? (
              "Finish"
            ) : (
              <>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}


// 3. Exam Completed Page (page.tsx in exam/completed):
// ```typescript
// "use client"

// import { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { ExamResult } from '@/types/types'
// import { useRouter } from 'next/navigation'

// export default function ExamCompletedPage() {
//   const [examResult, setExamResult] = useState<ExamResult | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const storedResult = localStorage.getItem('examResult')
//     if (storedResult) {
//       setExamResult(JSON.parse(storedResult))
//     } else {
//       router.push('/') // Redirect if no result
//     }
//   }, [])

//   if (!examResult) return null

//   const calculatePercentage = () => {
//     return ((examResult.correctAnswers / examResult.totalQuestions) * 100).toFixed(2)
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Exam Results</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid md:grid-cols-2 gap-4">
//             <div>
//               <h3 className="text-xl font-semibold mb-4">Performance Summary</h3>
//               <ul className="space-y-2">
//                 <li>Total Questions: {examResult.totalQuestions}</li>
//                 <li>Correct Answers: {examResult.correctAnswers}</li>
//                 <li>Incorrect Answers: {examResult.incorrectAnswers}</li>
//                 <li>Skipped Questions: {examResult.skippedQuestions.length}</li>
//                 <li>Unattempted Questions: {examResult.unattemptedQuestions}</li>
//                 <li>Percentage: {calculatePercentage()}%</li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-4">Detailed Performance</h3>
//               {/* You can add more detailed breakdown here */}
//             </div>
//           </div>
//           <div className="mt-6 flex space-x-4">
//             <Button onClick={() => router.push('/')}>
//               Back to Home
//             </Button>
//             <Button variant="secondary">
//               Review Answers
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }