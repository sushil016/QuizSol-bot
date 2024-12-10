import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Get all question sets regardless of status
    const questionSets = await prisma.questionSet.findMany({
      include: {
        subCategory: true,
        questions: true
      }
    })
    return NextResponse.json(questionSets)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 