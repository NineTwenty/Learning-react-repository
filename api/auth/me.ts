import { PrismaClient } from '@prisma/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { UnsecuredJWT } from 'jose';
import { findUserById } from 'utils/prismaUtils';
import { z } from 'zod';

const prisma = new PrismaClient();

function verifyJWT(authHeader: string | string[] | undefined) {
  // Validate input
  const token = z
    .string()
    .startsWith('Bearer ')
    // Extract token
    .transform((val) => val.substring(7))
    .parse(authHeader);

  const tokenPayload = UnsecuredJWT.decode(token).payload;

  return z
    .object({
      userId: z
        .string()
        .min(1, { message: 'userId is required in token payload' })
        .transform((val) => Number(val)),
    })
    .parse(tokenPayload);
}

function authenticateUser(request: VercelRequest) {
  const { authorization } = request.headers;
  const { userId } = verifyJWT(authorization);
  return userId;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(400);
  }

  const userId = authenticateUser(req);
  const user = await findUserById(userId, prisma);
  if (user) {
    return res.status(200).send({ user });
  }
}
