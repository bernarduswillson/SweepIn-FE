import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ profile, account, user }) {
      try {
        const response = await axios.post('http://localhost:1337/login', {
          email: profile?.email ?? '',
        });

        const { status } = response.data;

        if (status === 'success') {
          return true;
        }

        return false;
      } catch (error) {
        console.error('Error checking email registration:', error);
        return false;
      }
    },
    async redirect(params: { url: string; baseUrl: string; }) {
      const { url, baseUrl } = params;
      if (url === '/api/auth/callback/error') {
        return baseUrl;
      }
      return '/tes';
    },
  },
  pages: {
    error: 'http://localhost:3000',
  },
});

export { handler as GET, handler as POST };
