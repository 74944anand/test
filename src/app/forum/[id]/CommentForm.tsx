"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function CommentForm({ forumId }: { forumId: string }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { data: session } = useSession();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {

      const data = await fetch("/api/user/getUserByEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email }),
      });
      const user = await data.json();
      if (!user) {
        throw new Error("User not found");
      }
      const response = await fetch(`/api/forums/${forumId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content, userId:user.id }), // Replace with actual user ID
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add comment");
      }

      alert("Comment added successfully!");
      setContent(""); // Clear input after success
      window.location.reload(); // Refresh comments
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Comment
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
