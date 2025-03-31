import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
  function middleware(req) {
    console.log("Middleware is running..."); // Debugging
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/login", // Redirect to login if not authenticated
    },
  }
);

export const config = {
  matcher: ["/((?!auth/login).*)"], // Protect all routes except /auth/login
};
