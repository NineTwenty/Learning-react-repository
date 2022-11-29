import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { findUserById } from 'utils/prismaUtils';

const prisma = new PrismaClient();

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.id;
  if (Array.isArray(userId)) {
    return res.status(400);
  }

  const user = await findUserById(Number(userId), prisma);
  if (user) {
    return res.status(200).send(user);
  }

  return res.status(404);
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
