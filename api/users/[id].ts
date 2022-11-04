import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import { findUserById } from 'utils/prismaUtils';

const prisma = new PrismaClient();

async function handleGet(req: VercelRequest, res: VercelResponse) {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    default:
      return res.status(400);
  }
}
