import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  callbacks: {
    authorized: ({ req }) => {
      // verify token and return a boolean
      const sessionToken = req.cookies.get("next-auth.session-token");
      if (sessionToken) return true;
      else return false;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
});
export const config = { matcher: ["/", "/normal-values"] };
