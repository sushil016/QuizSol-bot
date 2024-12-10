import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    let data;
    switch (type) {
      case "mostAttempted":
        data = await prisma.analytics.findMany({
          orderBy: { totalAttempts: "desc" },
          take: 10,
        });
        break;
      case "leastAttempted":
        data = await prisma.analytics.findMany({
          orderBy: { totalAttempts: "asc" },
          take: 10,
        });
        break;
      case "categoryAccuracy":
        data = await prisma.analytics.groupBy({
          by: ["questionId"],
          _avg: {
            correctAttempts: true,
            totalAttempts: true,
          },
        });
        break;
      default:
        data = await prisma.analytics.findMany();
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 