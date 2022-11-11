import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import {
  authenticateUser,
  preparePostForClient,
} from '../../src/utils/prismaUtils';

const prisma = new PrismaClient();

async function handlePost(
  req: VercelRequest,
  res: VercelResponse,
  userId: number
) {
  const postData = z
    .object({
      postText: z.string().min(1),
    })
    .parse(req.body);

  const post = await prisma.post.create({
    data: {
      ...postData,
      author: { connect: { id: userId } },
      feed: { connect: { ownerId: userId } },
    },
  });

  res.status(201).send({ post: preparePostForClient(post) });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userId = authenticateUser(req);
  switch (req.method) {
    case 'POST':
      return handlePost(req, res, userId);
    default:
      return res.status(405);
  }
}
