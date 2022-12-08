import {
  Prisma,
  PrismaClient,
  Message as PrismaMessage,
  Post as PrismaPost,
} from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UnsecuredJWT } from 'jose';
import { z, ZodError } from 'zod';
import { serialize } from 'cookie';

export const userInclude = Prisma.validator<Prisma.UserInclude>()({
  avatar: { include: { image: true } },
  friends: { select: { id: true } },
  posts: { select: { id: true } },
  feed: { select: { id: true } },
  images: true,
});

export type UserWithRelationships = Prisma.UserGetPayload<{
  include: typeof userInclude;
}>;

export function prepareUserForClient(user: UserWithRelationships) {
  // Remove sensitive information and transform for client
  const {
    password,
    login,
    avatar,
    friends,
    posts,
    feed,
    lastOnlineTime,
    updatedAt,
    ...rest
  } = user;

  if (!feed) {
    throw new Error('Data error: feed must be present on user object');
  }

  const objToId = ({ id }: { id: number }) => id;
  const formatedUser = {
    ...rest,
    updatedAt: updatedAt.toISOString(),
    lastOnlineTime: lastOnlineTime.toISOString(),
    avatar: avatar?.image.src,
    friends: friends.map(objToId),
    posts: posts.map(objToId),
    feed: feed.id,
    fullName: `${rest.firstName} ${rest.lastName}`,
  };
  return formatedUser;
}

export type User = ReturnType<typeof prepareUserForClient>;

export async function findUserById(userId: number, prisma: PrismaClient) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: userInclude,
  });

  if (user) {
    return prepareUserForClient(user);
  }
}

export const dialogInclude = Prisma.validator<Prisma.DialogInclude>()({
  members: { include: userInclude },
  messages: { select: { id: true } },
});

type DialogWithRelationships = Prisma.DialogGetPayload<{
  include: typeof dialogInclude;
}>;

export function prepareDialogForClient({
  members,
  messages,
  updatedAt,
  ...rest
}: DialogWithRelationships) {
  return {
    updatedAt: updatedAt.toISOString(),
    members: members.map(({ id }) => id),
    messages: messages.map(({ id }) => id),
    ...rest,
  };
}

export type Dialog = ReturnType<typeof prepareDialogForClient>;

export const feedInclude = Prisma.validator<Prisma.FeedInclude>()({
  posts: true,
});

type FeedWithRelationships = Prisma.FeedGetPayload<{
  include: typeof feedInclude;
}>;

export function prepareFeedForClient({
  posts,
  ...rest
}: FeedWithRelationships) {
  return {
    ...rest,
    posts: posts.map((val) => val.id),
  };
}

export type Feed = ReturnType<typeof prepareFeedForClient>;

export function prepareMessageForClient({
  authorId,
  createdAt,
  ...rest
}: PrismaMessage) {
  return {
    ...rest,
    createdAt: createdAt.toISOString(),
    author: authorId,
  };
}

export type Message = ReturnType<typeof prepareMessageForClient>;

export function preparePostForClient({
  authorId,
  created,
  ...rest
}: PrismaPost) {
  return {
    ...rest,
    created: created.toISOString(),
    author: authorId,
  };
}

export type Post = ReturnType<typeof preparePostForClient>;

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
