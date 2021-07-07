import agent from 'superagent';

// Generation of URL with prefix part
const API_PREFIX = '/api/';
const prefix = (request) => {
  request.url = `${API_PREFIX}${request.url}`;
  return request;
};

const getToken = () => localStorage.getItem('token');

const getAuthString = () => {
  const token = getToken();
  if (token) return `Bearer ${token}`;

  return '';
};

// func to get superagent instance
export const getAgent = () =>
  agent
    .agent()
    .type('application/json')
    // Apply URL prefix
    .use(prefix)
    // set Headers property
    .set('Authorization', getAuthString()); // keep token actual every call
