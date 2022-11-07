import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { UnsecuredJWT } from 'jose';

const prisma = new PrismaClient();
const LoginRequestBody = z.object({
  login: z.string(),
  password: z.string(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405);
  }

  const validatedBody = LoginRequestBody.safeParse(req.body);
  if (!validatedBody.success) {
    return res.status(400);
  }
  const { login, password } = validatedBody.data;
  const user = await prisma.user.findUnique({ where: { login } });
  // Authentication
  if (user && user.password === password) {
    const token = new UnsecuredJWT({ userId: user.id })
      .setIssuedAt()
      .setExpirationTime('100m')
      .encode();
    return res.status(200).send({ token });
  }
  return res.status(401).send(['Wrong login or password']);
}