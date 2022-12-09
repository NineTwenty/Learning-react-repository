import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { prepareUserForClient, userInclude } from 'utils/prismaUtils';
import { queryWithAuthentication } from 'utils/serverUtils';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405);
  }

  await queryWithAuthentication({
    res,
    req,
    query: async () => {
      const users = await prisma.user.findMany({
        include: userInclude,
      });

      res.status(200).send({ users: users.map(prepareUserForClient) });
    },
  });
}
