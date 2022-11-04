import { Prisma, PrismaClient } from '@prisma/client';

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
  const { password, login, avatar, friends, posts, feed, ...rest } = user;

  if (!feed) {
    throw new Error('Data error: feed must be present on user object');
  }

  const objToId = ({ id }: { id: number }) => id;
  const formatedUser = {
    ...rest,
    avatar: avatar?.image.src,
    friends: friends.map(objToId),
    posts: posts.map(objToId),
    feed: feed.id,
    fullName: `${rest.firstName} ${rest.lastName}`,
  };
  return formatedUser;
}

export async function findUserById(userId: number, prisma: PrismaClient) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: userInclude,
  });

  if (user) {
    return prepareUserForClient(user);
  }
}
