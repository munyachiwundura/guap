import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import type { Card } from '@prisma/client';

const webPush = require('web-push');

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);

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

  webPush
    .sendNotification(
      data.subscription,
      JSON.stringify({
        title: 'Transaction Complete',
        message: `A transaction of ${request.ammount} was completed on card`,
      })
    )
    .then((response: any) => {
      res.writeHead(response.statusCode, response.headers).end(response.body);
    })
    .catch((err: any) => {
      if ('statusCode' in err) {
        res.writeHead(err.statusCode, err.headers).end(err.body);
      } else {
        console.error(err);
        res.statusCode = 500;
        res.end();
      }
    });

  console.log(request);
  res.status(200).json({ request });
}
