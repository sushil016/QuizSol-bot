"use client"

import { MostAttemptedQuestions } from "@/components/MostAttemptedQuestions"
import { LeastAttemptedQuestions } from "@/components/LeastAttemptedQuestions"
import { CategoryAccuracy } from "@/components/CategoryAccuracy"
import { AverageSolvingTime } from "@/components/AverageSolvingTime"

export default function ContentAnalytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Content Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MostAttemptedQuestions />
        <LeastAttemptedQuestions />
        <CategoryAccuracy />
        <AverageSolvingTime />
      </div>
    </div>
  )
}

