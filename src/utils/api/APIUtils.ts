import axios from 'axios';
import { z } from 'zod';

// Generation of URL with prefix part
const API_PREFIX = '/api/';

export const getInstance = () =>
  axios.create({
    baseURL: API_PREFIX,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

export const isTokenExpireResponse = (error: unknown): boolean => {
  if (!axios.isAxiosError(error)) return false;
  const parsedError = z
    .object({
      data: z.object({
        message: z.string().min(1),
      }),
    })
    .parse(error.response);

  return (
    parsedError.data.message === 'userId is required in token payload' ||
    parsedError.data.message === 'auth_token required'
  );
};
