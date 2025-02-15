import React from 'react';

import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';

export const AuthProvider = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <SessionProvider basePath={'/auth'} session={session}>
      {children}
    </SessionProvider>
  );
};
