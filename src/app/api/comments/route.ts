import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { content, forumId, userId } = await req.json();
  const comment = await prisma.comment.create({ data: { content, forumId, userId } });
  return NextResponse.json(comment);
}
