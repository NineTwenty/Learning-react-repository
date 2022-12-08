import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { queryWithAuthentication } from 'utils/prismaUtils';

const prisma = new PrismaClient();

async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) {
  const postId = z
    .string()
    .min(1)
    .transform((id) => Number(id))
    .parse(req.query.id);

  await prisma.post.delete({
    where: { id: postId, authorId: userId },
  });

  return res.status(200);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await queryWithAuthentication({
    req,
    res,
    query: async (userId) => {
      switch (req.method) {
        case 'DELETE':
          await handleDelete(req, res, userId);
          break;
        default:
          res.status(405).end();
      }
    },
  });
}
