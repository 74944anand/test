import Link from "next/link";

interface Forum {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
}

export default function ForumCard({ forum }: { forum: Forum }) {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{forum.title}</h2>
      <p>{forum.description}</p> 
      <Link href={`/forum/${forum.id}`} className="text-blue-500 mt-2 block">
        View More
      </Link>
    </div>
  );
}
