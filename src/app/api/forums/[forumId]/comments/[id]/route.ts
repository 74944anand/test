import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  context: { params: { forumId: string; id: string } }
) {
  const { id } = context.params;

  try {
    // Find the comment
    const comment = await prisma.comment.findUnique({
      where: { id: id },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
