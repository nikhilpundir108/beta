// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    // Protect everything except static files, favicon, and Next.js internals
    "/((?!_next|.*\\..*|favicon.ico).*)",
  ],
};
