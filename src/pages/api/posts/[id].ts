import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticateUser } from 'utils/prismaUtils';

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
  const userId = authenticateUser(req);
  switch (req.method) {
    case 'DELETE':
      return handleDelete(req, res, userId);
    default:
      return res.status(405);
  }
}
