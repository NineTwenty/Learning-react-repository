import axios from 'axios';

// Generation of URL with prefix part
const API_PREFIX = '/api/';

const getToken = () => localStorage.getItem('token');

const getAuthString = () => {
  const token = getToken();
  if (token) return `Bearer ${token}`;

  return '';
};

export const getInstance = () =>
  axios.create({
    baseURL: API_PREFIX,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthString(),
    },
  });

type MirageErrorResponse = {
  message: string;
  stack: string;
};

export const isMirageErrorResponse = (
  value: unknown
): value is MirageErrorResponse =>
  value !== null &&
  value !== undefined &&
  (value as MirageErrorResponse).message !== undefined &&
  (value as MirageErrorResponse).stack !== undefined;

export const isTokenExpireResponse = (error: unknown): boolean =>
  axios.isAxiosError(error) &&
  isMirageErrorResponse(error.response?.data) &&
  error.response?.data.message === 'jwt expired';
