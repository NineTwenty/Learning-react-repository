import {
  Prisma,
  PrismaClient,
  Message as PrismaMessage,
  Post as PrismaPost,
} from '@prisma/client';
import type { VercelRequest } from '@vercel/node';
import { UnsecuredJWT } from 'jose';
import { z } from 'zod';

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

export function preparePostForClient({ authorId, ...rest }: PrismaPost) {
  return {
    ...rest,
    author: authorId,
  };
}

export type Post = ReturnType<typeof preparePostForClient>;

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
        .number()
        .min(1, { message: 'userId is required in token payload' }),
    })
    .parse(tokenPayload);
}

export function authenticateUser(request: VercelRequest) {
  const { authorization } = request.headers;
  const { userId } = verifyJWT(authorization);
  return userId;
}
