import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import {
  authenticateUser,
  prepareFeedForClient,
  preparePostForClient,
} from 'utils/prismaUtils';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405);
  }

  authenticateUser(req);

  const feed = await prisma.feed.findUnique({
    where: { id: Number(req.query.id) },
    include: {
      posts: true,
    },
  });

  if (!feed) {
    return res.status(404);
  }

  return res.status(200).send({
    feed: prepareFeedForClient(feed),
    posts: feed.posts.map(preparePostForClient),
  });
}
