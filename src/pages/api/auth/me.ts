import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { findUserById } from 'utils/prismaUtils';
import { queryWithAuthentication } from 'utils/serverUtils';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405);
  }

  await queryWithAuthentication({
    req,
    res,
    query: async (userId) => {
      const user = await findUserById(userId, prisma);
      if (user) {
        return res.status(200).send({ user });
      }
    },
  });
}
