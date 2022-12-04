import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { UnsecuredJWT } from 'jose';

const prisma = new PrismaClient();
const LoginRequestBody = z.object({
  login: z.string(),
  password: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405);
  }

  const validatedBody = LoginRequestBody.safeParse(req.body);
  if (!validatedBody.success) {
    return res.status(400);
  }
  const { login, password } = validatedBody.data;
  const user = await prisma.user.findUnique({ where: { login, password } });
  // Authentication
  if (user) {
    const token = new UnsecuredJWT({ userId: user.id })
      .setIssuedAt()
      .setExpirationTime('100m')
      .encode();
    return res.status(200).send({ token });
  }
  return res.status(401).send(['Wrong login or password']);
}
