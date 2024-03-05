import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProfile from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: {label: "Email", type: "email"},
    //     password: {label: "Password", type: "password"},
    //   },
    //   async authorize(credentials) {
    //     const { email, password } = credentials as {
    //       email: string,
    //       password: string,
    //     };
    //     const user: any = {
    //       id: 1,
    //       fullname: "Ditra Amadia",
    //       email: "dam@gmail.com",
    //       role: "admin"
    //     }
    //     if (email === "dam@gmail.com" && password === "123") {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   }
    // }),
    GoogleProfile({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async jwt({token, account, profile}: any) {
      return token;
    },
    async session({session, token}: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      // Handle role here
      session.user.role = "admin"
      return session;
    }
  }
}

const handler = NextAuth(authOptions);

export {
  handler as GET, handler as POST
};