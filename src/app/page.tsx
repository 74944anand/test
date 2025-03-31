"use client"
import { useEffect, useState } from "react";
import ForumCard from "@/components/ForumCard";

export interface Forum {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: string;
}

export default function Home() {
  const [forums, setForums] = useState<Forum []>([]);

  useEffect(() => {
    fetch("/api/forums")
      .then(res => res.json())
      .then(setForums);
  }, []);

  return (
    <div>
      {forums.map((forum) => {
        return(
        <ForumCard key={forum.id} forum={forum} />
      )})}
    </div>
  );
}
