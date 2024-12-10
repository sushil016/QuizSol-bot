"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function CompletedPage() {
  const router = useRouter()

  return (
    <div className="container max-w-2xl mx-auto py-20">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center"
      >
        <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Exam Completed!</h1>
        <p className="text-muted-foreground mb-8">
          You have successfully completed the exam.
        </p>
        <div className="space-x-4">
          <Button onClick={() => router.push("/exam")}>
            Try Another Exam
          </Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  )
} 