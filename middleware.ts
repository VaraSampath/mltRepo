import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  callbacks: {
    authorized: ({ token }) => {
      if (token) return true;
      else return false;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
});
export const config = { matcher: ["/", "/normal-values", "/patients"] };
