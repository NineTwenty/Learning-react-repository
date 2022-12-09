import { serialize } from 'cookie';
import { UnsecuredJWT } from 'jose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';

function verifyJWT(token: string) {
  const tokenPayload = UnsecuredJWT.decode(token).payload;

  return z
    .object({
      userId: z
        .number()
        .min(1, { message: 'userId is required in token payload' }),
    })
    .parse(tokenPayload);
}

export function authenticateUser(request: NextApiRequest) {
  const { auth_token: token } = request.cookies;

  if (!token) {
    throw new Error('auth_token required');
  }

  const { userId } = verifyJWT(token);
  return userId;
}

/**
 * Mutate response object to remove (by expiring) auth-token cookie on client
 */
export function expireAuthCookie(res: NextApiResponse): void {
  res.setHeader(
    'Set-Cookie',
    serialize('auth_token', '', {
      httpOnly: true,
      expires: new Date(Date.now() - 1000 * 1000),
      sameSite: 'strict',
      path: '/',
    })
  );
}

export function handleServerError<T extends Error>(
  err: T,
  res: NextApiResponse
) {
  if (err instanceof ZodError) {
    if (err.message === 'userId is required in token payload') {
      expireAuthCookie(res);
      return res.status(401).send({ message: err.message });
    }
  }

  if (err.message === 'auth_token required') {
    expireAuthCookie(res);
    return res.status(401).send({ message: err.message });
  }

  return res.status(500).end();
}

export async function queryWithAuthentication<
  F extends (userId: number) => Promise<void>
>({
  req,
  res,
  query,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  query: F;
}): Promise<void> {
  try {
    const userId = authenticateUser(req);
    await query(userId);
  } catch (error) {
    if (error instanceof Error) {
      handleServerError(error, res);
    }
  }
}
