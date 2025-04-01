"use client";

import { signIn } from "next-auth/react";

export default function AuthPage() {


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>
        <button
          className="w-full bg-red-500 text-white py-2 rounded-md mb-4"
          onClick={() => signIn("google",{ callbackUrl: "/" })}
        >
          Sign in with Google
        </button>

        <hr className="my-4" />
      </div>
    </div>
  );
}
