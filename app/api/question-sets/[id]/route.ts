import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // First, find the question set
    const questionSet = await prisma.questionSet.findUnique({
      where: { 
        id: params.id,
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

    if (!questionSet) {
      return NextResponse.json(
        { error: "Question set not found" },
        { status: 404 }
      )
    }

    // Check if the set is published or return error
    if (questionSet.status !== "PUBLISHED") {
      return NextResponse.json(
        { error: "Question set is not published" },
        { status: 403 }
      )
    }

    return NextResponse.json(questionSet)
  } catch (error) {
    console.error("Error fetching question set:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
} 