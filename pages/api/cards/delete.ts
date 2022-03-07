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
  console.log(data);
  const transactions = await prisma.transaction.deleteMany({
    where: {
      cardId: data.id,
    },
  });

  const request = await prisma.card.delete({
    where: {
      id: data.id,
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
      content: `${request.bank} ${request.accountType} Card ${request.name} has been deleted`,
    },
  });

  res.status(200).json({ request });
}
