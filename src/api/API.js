import { getAgent } from './APIUtils';

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
  /**
   * @param {string} url
   * @param {object} payload
   */
  async post(url, payload) {
    const { ok, body } = await getAgent().post(url).send(payload);
    if (ok) {
      return body;
    }
  },
};
