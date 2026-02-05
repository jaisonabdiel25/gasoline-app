import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: [
    /*
      Protege TODO excepto:
      - /api (NextAuth)
      - /_next (assets)
      - /signin (login)
    */
    "/((?!api|_next|signin).*)",
  ],
};
