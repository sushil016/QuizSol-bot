import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { SetStatus } from "@prisma/client"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const questionSets = await prisma.questionSet.findMany({
      where: {
        subCategoryId: params.id,
        status: "PUBLISHED" as SetStatus,
      },
      include: {
        questions: {
          select: {
            id: true,
            questionText: true,
            options: true,
            correctAnswer: true,
            explanation: true,
            questionImageUrl: true,
            explanationImageUrl: true,
            category: true,
            difficulty: true,
          }
        },
        subCategory: {
          include: {
            category: true,
          },
        },
      },
    })

    // Flatten all questions from all sets into a single array
    const allQuestions = questionSets.flatMap(set => 
      set.questions.map(q => ({
        ...q,
        setTitle: set.title,
        categoryName: set.subCategory.category.name,
        subCategoryName: set.subCategory.name,
        subCategoryYear: set.subCategory.year,
      }))
    )

    return NextResponse.json({
      questions: allQuestions,
      totalQuestions: allQuestions.length,
    })
  } catch (error) {
    console.error("Error fetching questions:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
} 