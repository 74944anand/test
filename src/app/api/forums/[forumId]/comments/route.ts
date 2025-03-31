import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { forumId: string } }) {
    try {
      const { content, userId } = await req.json();
  
      if (!content || !userId) {
        return NextResponse.json({ error: "Content and userId are required" }, { status: 400 });
      }
  
      const comment = await prisma.comment.create({
        data: {
          content,
          userId,
          forumId: params.forumId,
        },
      });
  
      return NextResponse.json({ success: true, comment }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
    }
  }
  