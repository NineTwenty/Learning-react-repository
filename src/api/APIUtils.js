import agent from 'superagent';

// Generation of URL with prefix part
const API_PREFIX = '/api/';
const prefix = (request) => {
  request.url = `${API_PREFIX}${request.url}`;
  return request;
};

// Callback for getting actual userId
const userId = () => localStorage.getItem('userId');

export const getAPI = () =>
  agent
    .agent()
    .type('application/json')
    // Apply URL prefix
    .use(prefix)
    // set Headers property
    .set('userId', `${userId()}`);

export function handleFetchResult(body, endpointName) {
  if (body.resultCode) {
    return body.data[endpointName];
  } else {
    throw Error(`Request error: ${endpointName}`);
  }
}