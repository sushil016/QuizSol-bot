import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const categories = await prisma.examCategory.findMany({
      include: {
        subCategories: true,
      },
      orderBy: {
        name: 'asc',
      },
    })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const category = await prisma.examCategory.create({
      data: body,
      include: {
        subCategories: true,
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 