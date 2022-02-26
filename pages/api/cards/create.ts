import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method got allowed' });
  }

  const session: any = await getSession({ req });
  const data = JSON.parse(req.body);

  const request = await prisma.card.create({
    data: {
      user: {
        connect: {
          email: session?.user?.email,
        },
      },
      ...data,
      balance: 0,
    },
  });

  const notify = await prisma.notifications.create({
    data: {
      user: {
        connect: {
          email: session?.user?.email,
        },
      },
      Date: new Date(),
      title: 'Card Created',
      content: `New ${request.bank} ${request.accountType} Card ${request.name} created with balance R${request.balance}`,
    },
  });

  res.status(200).json({ request });
}
