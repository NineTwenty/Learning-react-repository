import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { findUserById, queryWithAuthentication } from 'utils/prismaUtils';

const prisma = new PrismaClient();

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.id;
  if (Array.isArray(userId)) {
    return res.status(400);
  }

  await queryWithAuthentication({
    req,
    res,
    query: async () => {
      const user = await findUserById(Number(userId), prisma);
      if (user) {
        return res.status(200).send(user);
      }

      res.status(404).end();
    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    default:
      return res.status(405);
  }
}
