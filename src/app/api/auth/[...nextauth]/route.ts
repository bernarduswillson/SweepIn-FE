import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProfile from 'next-auth/providers/google'
import axios from 'axios'
import { SignToken } from '@/utils/token'

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProfile({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + '/login',
          {
            email: profile?.email
          }
        )
        if (response && response.data.message === 'Login successful') {
          return true
        }
        throw new Error('Login failed')
      } catch (error) {
        return '/masuk?error=AccessDenied'
      }
    },
    async jwt({ token, user, account }) {
      if (token) {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + '/login',
          {
            email: token.email,
          }
        );
        token.role = response.data.data.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/login',
        {
          email: session.user.email
        }
      )
      session.user.id = response.data.data.id
      session.user.email = response.data.data.email
      session.user.name = response.data.data.name
      session.user.role = response.data.data.role
      session.loggedUser = token.userLoggedIn
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
