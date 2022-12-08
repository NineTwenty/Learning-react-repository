import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import {
  dialogInclude,
  prepareDialogForClient,
  prepareUserForClient,
  queryWithAuthentication,
} from 'utils/prismaUtils';

const prisma = new PrismaClient();

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) {
  const dialogs = await prisma.dialog.findMany({
    where: { members: { some: { id: userId } } },
    include: dialogInclude,
  });

  if (!dialogs) {
    return res.status(404);
  }

  // Transform members field of dialogs in array of ids
  const transformedDialogs = dialogs.map(prepareDialogForClient);

  // Make flat users array and prepare for client
  const users = dialogs
    .flatMap(({ members }) => members)
    .map(prepareUserForClient);

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

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) {
  const { members } = z
    .object({ members: z.array(z.number()).nonempty() })
    .parse(req.body);

  const membersMap = members.map((id) => ({
    id,
  }));

  const dialog = await prisma.dialog.create({
    data: { members: { connect: [{ id: userId }, ...membersMap] } },
    include: dialogInclude,
  });

  return res.status(201).send({ dialog: prepareDialogForClient(dialog) });
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
          res.status(405).end();
      }
    },
  });
}
