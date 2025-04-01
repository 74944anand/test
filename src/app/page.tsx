"use client"
import { useEffect, useState } from "react";
import ForumCard from "@/components/ForumCard";

export interface Forum {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
}

export default function Home() {
  const [forums, setForums] = useState<Forum []>([]);

  useEffect(() => {
    fetch("/api/forums")
      .then(res => res.json())
      .then(setForums);
  }, []);

  if(forums?.length === 0) return <div>No forums Available...</div>;
  return (
    <div>
      {forums.map((forum) => {
        return(
        <ForumCard key={forum.id} forum={forum} />
      )})}
    </div>
  );
}
