import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import type { Card } from '@prisma/client';

type Data = Card[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await getSession({ req });
  const request = await prisma.transactionCategory.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });
  console.log(request, session?.user);
  res.status(200).json({ request });
}
