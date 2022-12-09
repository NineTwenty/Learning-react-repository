import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Expire auth cookie explicitly
  return res
    .status(200)
    .setHeader(
      'Set-Cookie',
      serialize('auth_token', '', {
        httpOnly: true,
        expires: new Date(Date.now() - 1000 * 1000),
        sameSite: 'strict',
        path: '/',
      })
    )
    .end();
}
