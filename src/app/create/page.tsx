"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreateForum() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

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
      const response = await fetch("/api/forums", {
        method: "POST",
        body: JSON.stringify({ title, description, userId:user.id }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json(); 

      if (!response.ok) {
        throw new Error(result.error || "Failed to create forum");
      }
      alert("Forum created successfully!");
      router.push("/"); // Redirect to the forum page after successful creation
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 max-w-md mx-auto">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Forum
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
