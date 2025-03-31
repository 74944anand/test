import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const forums = await prisma.forum.findMany();
    
    return NextResponse.json(
      forums.map((forum) => ({
        ...forum,
        id: String(forum.id), // 🔹 Ensure ID is a string
      })),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch forums",errorDettails:error }, { status: 500 });
  }
}

export async function POST(req: Request) {

  const { title, userId, description} = await req.json();
  const forum = await prisma.forum.create({ data: { title, description, userId } });
  if(!forum) {
    return NextResponse.json({ error: "Forum creation failed" }, { status: 500 });
  }
  return NextResponse.json({data:forum, success: true}, { status: 201 });
}
