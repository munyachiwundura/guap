import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Auth0Provider from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const authHandler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    // Auth0Provider({
    //   clientId: process.env.AUTH0_CLIENT_ID ?? 'undefined',
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET ?? 'undefined',
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
