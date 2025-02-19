// import { NextAuthResult } from 'next-auth';

// import { auth } from '@/auth';
// import { TwitterApi } from 'twitter-api-v2';

// export const POST = auth(async req => {
//   const { message } = (await req.json()) as { message: string };

//   const accessToken = req.auth?.accessToken;

//   try {
//     if (!accessToken) {
//       throw new Error('access token doesn`t exist!');
//     }
//     const twitterClient = new TwitterApi(accessToken);

//     const res = await twitterClient.v2.tweet(message);

//     return Response.json({ data: res });
//   } catch (error) {
//     return Response.json({ message: (error as Error).message }, { status: 401 });
//   }
// }) as unknown as NextAuthResult;
