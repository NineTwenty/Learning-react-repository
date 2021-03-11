import agent from 'superagent';

// Generation of URL with prefix part
const API_PREFIX = '/api/';
const prefix = (request) => {
  request.url = `${API_PREFIX}${request.url}`;
  return request;
};

// func to get actual userId
const userId = () => localStorage.getItem('userId');

// func to get superagent instance
export const getAgent = () =>
  agent
    .agent()
    .type('application/json')
    // Apply URL prefix
    .use(prefix)
    // set Headers property
    .set('userId', `${userId()}`); // keep userId actual every call

export function handleFetchResult(body, endpointName) {
  if (body[endpointName]) {
    return body[endpointName];
  } else {
    throw Error(`Request error: ${endpointName}`);
  }
}
