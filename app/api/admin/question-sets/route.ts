import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { uploadToStorage } from "@/lib/storage"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const subCategoryId = formData.get("subCategoryId") as string
    const status = formData.get("status") as "DRAFT" | "PUBLISHED"
    const questionsJson = formData.get("questions") as string
    const questions = JSON.parse(questionsJson)

    // Create the question set with questions
    const questionSet = await prisma.questionSet.create({
      data: {
        title,
        description,
        subCategoryId,
        status,
        questions: {
          create: await Promise.all(questions.map(async (q: any) => {
            let questionImageUrl = null
            let explanationImageUrl = null

            // Handle image uploads if present
            if (q.questionImage) {
              questionImageUrl = await uploadToStorage(q.questionImage)
            }
            if (q.explanationImage) {
              explanationImageUrl = await uploadToStorage(q.explanationImage)
            }

            return {
              questionText: q.questionText,
              options: JSON.stringify(q.options),
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              category: q.category,
              subCategory: q.subCategory,
              difficulty: q.difficulty,
              questionImageUrl,
              explanationImageUrl,
            }
          })),
        },
      },
      include: {
        questions: true,
      },
    })

    return NextResponse.json(questionSet)
  } catch (error) {
    console.error("Error creating question set:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 