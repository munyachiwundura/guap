import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import type { Card } from '@prisma/client';

type Data = Card[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method got allowed' });
  }

  const session: any = await getSession({ req });
  const data = JSON.parse(req.body);

  const request = await prisma.transaction.create({
    data: {
      user: {
        connect: {
          email: session?.user?.email,
        },
      },
      ammount: parseInt(data.ammount),
      date: new Date(data.date),
      title: data.title,
      TransactionCategory: {
        connect: {
          id: data.transactionCategoryId,
        },
      },
      Card: {
        connect: {
          id: data.cardId,
        },
      },
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
      title: 'Transaction Complete',
      content: `A transaction of ${request.ammount} was completed on card`,
    },
  });

  console.log(request);
  res.status(200).json({ request });
}
