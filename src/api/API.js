import { getAPI, handleFetchResult } from './APIUtils';

export async function fetchDialogs() {
  const response = await getAPI().get('dialogs');

  return response.body;
}

export const dialogsAPI = {
  async fetchMembers() {
    const response = await getAPI().get('dialogs/members');

    return response.body.users;
  },
};

// Authentication API
export const authAPI = {
  async authLogin(login, password) {
    // Login put request
    const {
      body: { success, user, errors },
    } = await getAPI().put('login').send({ login, password });

    // Return payload based on success status
    return success ? { success, user } : { success, errors };
  },
};

// Posts API
export const postsAPI = {
  endpointName: 'posts',

  async sumbitPost(post) {
    const { body } = await getAPI().post(this.endpointName).send({ post });

    return handleFetchResult(body, this.endpointName);
  },
};
