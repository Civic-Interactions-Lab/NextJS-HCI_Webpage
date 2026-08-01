import requestMiddleware from "./request-middleware";

export default requestMiddleware;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next (Next.js internals)
     * - all common public/static asset file types
     */
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mov|xml|txt)).*)",
    // Always run for API routes and RPC calls if we add server-side request checks later.
    "/(api|trpc)(.*)",
  ],
};
