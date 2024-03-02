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
    async signIn({ profile }) {
      try {
        const response = await axios.post('http://localhost:5000/login', {
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
  },
});

export { handler as GET, handler as POST }; 