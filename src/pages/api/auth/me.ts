import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateUser, findUserById } from 'utils/prismaUtils';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405);
  }

  const userId = authenticateUser(req);
  const user = await findUserById(userId, prisma);
  if (user) {
    return res.status(200).send({ user });
  }
}
