import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import { authenticateUser } from '../../src/utils/prismaUtils';

const prisma = new PrismaClient();

async function handleGet(
  req: VercelRequest,
  res: VercelResponse,
  userId: number
) {
  const dialogs = await prisma.dialog.findMany({
    where: { members: { some: { id: userId } } },
    include: { members: true, messages: { select: { id: true } } },
  });

  if (!dialogs) {
    return res.status(404);
  }

  // Transform members field of dialogs in array of ids
  const transformedDialogs = dialogs.map(({ members, messages, ...rest }) => ({
    members: members.map(({ id }) => id),
    messages: messages.map(({ id }) => id),
    ...rest,
  }));

  // Make flat users array
  const users = dialogs.flatMap(({ members }) => members);

  // Filter out duplicate users
  const ids: number[] = [];
  const uniqueUsers = users.filter((user) => {
    if (ids.indexOf(user.id) === -1) {
      ids.push(user.id);
      return true;
    }
    return false;
  });

  return res
    .status(200)
    .send({ dialogs: transformedDialogs, users: uniqueUsers });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userId = authenticateUser(req);
  switch (req.method) {
    case 'GET':
      return handleGet(req, res, userId);
    default:
      res.status(405);
  }
}
