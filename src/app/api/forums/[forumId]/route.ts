import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request, context: { params: { forumId: string } }) {
  const { forumId } = context.params;

  try {
    const forum = await prisma.forum.findUnique({
      where: { id: forumId },
      include: { user: true, comments: { include: { user: true } } },
    });

    if (!forum) {
      return NextResponse.json({ error: "Forum not found" }, { status: 404 });
    }

    return NextResponse.json(forum, { status: 200 });
  } catch (error) {
    console.error("Error fetching forum:", error);
    return NextResponse.json({ error: "Failed to fetch forum" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: { params: { forumId: string } }) {
  const { forumId } = context.params;

  try {
    // Delete all comments associated with the forum first (optional, but recommended for data integrity)
    await prisma.comment.deleteMany({
      where: { forumId },
    });

    // Delete the forum itself
    const deletedForum = await prisma.forum.delete({
      where: { id: forumId },
    });

    if (!deletedForum) {
      return NextResponse.json({ error: "Forum not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Forum deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting forum:", error);
    return NextResponse.json({ error: "Failed to delete forum" }, { status: 500 });
  }
}
