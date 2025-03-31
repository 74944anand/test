"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import CommentForm from "./CommentForm";

export default function ForumDetails() {
  const { id } = useParams(); // ✅ Extracting `id` using useParams()
  const { data: session } = useSession();
  const router = useRouter();

  const [forum, setForum] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isForumOwner, setIsForumOwner] = useState(false);

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const res = await fetch(`/api/forums/${id}`);
        if (!res.ok) throw new Error("Forum not found");

        const data = await res.json();
        setForum(data);

        if (session?.user?.email && data.user?.email === session.user.email) {
          setIsForumOwner(true);
        }
      } catch (error) {
        console.error("Error fetching forum:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchForum();
    }
  }, [id, session?.user?.email]);

  const handleDeleteForum = async () => {
    if (!forum) return;

    try {
      await fetch(`/api/forums/${forum.id}`, { method: "DELETE" });
      router.push("/"); // ✅ Redirect to home after deletion
    } catch (error) {
      console.error("Error deleting forum:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await fetch(`/api/forums/${forum.id}/comments/${commentId}`, { method: "DELETE" });
      setForum((prevForum: any) => ({
        ...prevForum,
        comments: prevForum.comments.filter((comment: any) => comment.id !== commentId),
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!forum) return <p className="text-center text-red-500">Forum not found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{forum.title}</h1>
      <p className="mt-2 text-gray-600">{forum.description}</p>
      <p className="mt-4 text-sm text-gray-400">
        Posted on: {new Date(forum.createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-400">By: {forum.user.name}</p>

      {isForumOwner && (
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleDeleteForum}
        >
          Delete Forum
        </button>
      )}

      {/* ✅ Comment Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        <CommentForm forumId={forum.id}  />
        {forum.comments.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {forum.comments.map((comment: any) => (
              <li key={comment.id} className="border p-2 rounded">
                <p>{comment.content}</p>
                <p className="text-sm text-gray-500">
                  - {comment.user.name} ({new Date(comment.createdAt).toLocaleString()})
                </p>
                {session?.user?.email === comment.user.email && (
                  <button
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete Comment
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
