import NextAuth, { Account, Profile, SessionStrategy, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({
      account,
    }: {
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile;
    }) {
      if (account?.provider === "google") {
        console.log("yes its google");
      }
      return true;
    },
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
