import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { prepareMessageForClient } from 'utils/prismaUtils';
import { queryWithAuthentication } from 'utils/serverUtils';

const prisma = new PrismaClient();

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) {
  const { dialogId, page = '1', limit = '10' } = req.query;
  if (!dialogId)
    return res
      .status(400)
      .send({ message: 'Query parameter "dialogId" is required' });

  if (Array.isArray(page) || Array.isArray(limit) || Array.isArray(dialogId))
    return res.status(400).send({
      message: 'Query parameters "page, limit, dialogId" must be number',
    });

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const dialogIdNumber = parseInt(dialogId, 10);

  const messages = await prisma.message.findMany({
    where: {
      AND: [
        { dialog: { id: dialogIdNumber } },
        { dialog: { members: { some: { id: userId } } } },
      ],
    },
    take: limitNumber,
    skip: (pageNumber - 1) * limitNumber,
    orderBy: {
      id: 'desc',
    },
  });

  return res
    .status(200)
    .send({ messages: messages.map(prepareMessageForClient) });
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) {
  const { text, dialogId } = z
    .object({
      text: z.string().min(1),
      dialogId: z.number(),
    })
    .parse(req.body);

  const message = await prisma.message.create({
    data: {
      text,
      author: { connect: { id: userId } },
      dialog: { connect: { id: dialogId } },
    },
  });

  return res.status(201).send({ message: prepareMessageForClient(message) });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await queryWithAuthentication({
    req,
    res,
    query: async (userId) => {
      switch (req.method) {
        case 'GET':
          await handleGet(req, res, userId);
          break;
        case 'POST':
          await handlePost(req, res, userId);
          break;
        default:
          res.status(405);
      }
    },
  });
}
