import NextAuth, { NextAuthResult } from 'next-auth';
import 'next-auth/jwt';
import Twitter from 'next-auth/providers/twitter';

const nextAuthResult = NextAuth({
  basePath: '/auth',
  providers: [
    Twitter({
      authorization:
        'https://x.com/i/oauth2/authorize?scope=users.read tweet.read tweet.write offline.access',
    }),
  ],
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  experimental: { enableWebAuthn: true },
});

export const { handlers, signOut } = nextAuthResult;

export const auth: NextAuthResult['auth'] = nextAuthResult.auth;

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
