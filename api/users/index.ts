import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import {
  authenticateUser,
  prepareUserForClient,
  userInclude,
} from '../../src/utils/prismaUtils';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405);
  }

  authenticateUser(req);

  const users = await prisma.user.findMany({
    include: userInclude,
  });

  return res.status(200).send({ users: users.map(prepareUserForClient) });
}
