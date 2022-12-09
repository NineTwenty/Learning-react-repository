import { User } from 'common/entities.types';
import { UnsecuredJWT } from 'jose';
import { Request } from 'miragejs';

export function createJWT(user: User) {
  const { id: userId } = user;

  return new UnsecuredJWT({ userId })
    .setIssuedAt()
    .setExpirationTime('100m')
    .encode();
}

export function verifyJWT(authHeader: string) {
  let token = '';

  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7, authHeader.length);
  }

  return UnsecuredJWT.decode(token).payload;
}

export function authenticateUser(request: Request) {
  const { Authorization } = request.requestHeaders;
  const { userId } = verifyJWT(Authorization);
  return userId;
}
