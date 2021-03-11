import { getAgent, handleFetchResult } from './APIUtils';

export async function fetchDialogs() {
  const response = await getAgent().get('dialogs?include=members');

  return response.body;
}

export const dialogsAPI = {
  async fetchMembers() {
    const response = await getAgent().get('dialogs?include=members');

    return response.body.users;
  },
};

// Authentication API
export const authAPI = {
  async authLogin(login, password) {
    // Login put request
    const {
      body: { success, user, errors },
    } = await getAgent().put('login').send({ login, password });

    // Return payload based on success status
    return success ? { success, user } : { success, errors };
  },
};

// Posts API
export const postsAPI = {
  endpointName: 'posts',

  async sumbitPost(post) {
    const { body } = await getAgent().post(this.endpointName).send({ post });

    return handleFetchResult(body, this.endpointName);
  },

  async fetchPosts() {
    const response = await getAgent().get(this.endpointName);
    console.dir(response);
    return handleFetchResult(response.body, this.endpointName);
  },
};

export const api = {
  /**
   * Fetch with get method
   * @param {string} url
   */
  async get(url) {
    const { ok, body } = await getAgent().get(url);

    if (ok) {
      return body;
    }
  },
};
