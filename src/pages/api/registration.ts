import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { UnsecuredJWT } from 'jose';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405);
  }

  const { firstName, lastName, login, email, password } = z
    .object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email(),
      login: z.string().min(1),
      password: z.string().min(5),
    })
    .parse(req.body);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      login,
      email,
      password,
      online: false,
      feed: { create: {} },
    },
  });

  const token = new UnsecuredJWT({ userId: user.id })
    .setIssuedAt()
    .setExpirationTime('100m')
    .encode();

  return res
    .status(200)
    .setHeader(
      'Set-Cookie',
      serialize('auth_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 100),
        sameSite: 'strict',
        path: '/',
      })
    )
    .send({ token });
}
