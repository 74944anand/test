"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">
          Community Forums
        </Link>
        <div>
          {session ? (
            <div className="flex items-center gap-4">
              <span>{session.user?.name}</span>
              <Link href="/create" className="px-3 py-1 bg-green-500 rounded-md">
                Create Forum
              </Link>
              <button
                onClick={() => signOut()}
                className="px-3 py-1 bg-red-500 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth/login" className="px-3 py-1 bg-blue-500 rounded-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
