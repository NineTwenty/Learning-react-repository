import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import {
  prepareFeedForClient,
  preparePostForClient,
  queryWithAuthentication,
} from 'utils/prismaUtils';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405);
  }

  await queryWithAuthentication({
    req,
    res,
    query: async () => {
      const feed = await prisma.feed.findUnique({
        where: { id: Number(req.query.id) },
        include: {
          posts: true,
        },
      });

      if (!feed) {
        res.status(404).end();
        return;
      }

      res.status(200).send({
        feed: prepareFeedForClient(feed),
        posts: feed.posts.map(preparePostForClient),
      });
    },
  });
}
