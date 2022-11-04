import { PrismaClient } from '@prisma/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { authenticateUser, findUserById } from '../../src/utils/prismaUtils';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(400);
  }

  const userId = authenticateUser(req);
  const user = await findUserById(userId, prisma);
  if (user) {
    return res.status(200).send({ user });
  }
}
