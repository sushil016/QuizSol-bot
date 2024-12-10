import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { SetStatus } from "@prisma/client"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const subCategoryId = searchParams.get("subCategoryId")

    const where = {
      status: "PUBLISHED" as SetStatus,
      ...(subCategoryId ? { subCategoryId } : {})
    }

    const questionSets = await prisma.questionSet.findMany({
      where,
      include: {
        subCategory: {
          include: {
            category: true
          }
        },
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
        }
      }
    })
    return NextResponse.json(questionSets)
  } catch (error) {
    console.error("Error fetching question sets:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
} 