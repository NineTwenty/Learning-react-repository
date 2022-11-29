import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import {
  authenticateUser,
  prepareUserForClient,
  userInclude,
} from 'utils/prismaUtils';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405);
  }

  authenticateUser(req);

  const users = await prisma.user.findMany({
    include: userInclude,
  });

  return res.status(200).send({ users: users.map(prepareUserForClient) });
}
