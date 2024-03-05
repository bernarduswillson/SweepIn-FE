import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProfile from "next-auth/providers/google";
import axios from "axios";
import SignToken from "@/utils/siginToken";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProfile({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async jwt({token, user, account}: any) {
      if (account) {
        const userLoggedIn = await SignToken(user?.email as string)
        token.userLoggedIn = userLoggedIn;
        console.log(account.accessToken);
      }
      console.log(token);
      return token
    },
    async session({session, token}: any) {
      session.loggedUser = token.userLoggedIn;
      console.log(session);
      return session;
    }
  }
}

const handler = NextAuth(authOptions);

export {
  handler as GET, handler as POST
};