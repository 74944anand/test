import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const forums = await prisma.forum.findMany({ include: { user: true } });
  return NextResponse.json(forums);
}

export async function POST(req: Request) {

  const { title, userId, description} = await req.json();
  const forum = await prisma.forum.create({ data: { title, description, userId } });
  if(!forum) {
    return NextResponse.json({ error: "Forum creation failed" }, { status: 500 });
  }
  return NextResponse.json({data:forum, success: true}, { status: 201 });
}
