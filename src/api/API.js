import { getAgent } from './APIUtils';

// Authentication API
export const authAPI = {
  async authLogin(login, password) {
    try {
      // Login request
      const {
        body: { token },
      } = await getAgent().post('auth/login').send({ login, password });

      if (token) {
        // Set token
        localStorage.setItem('token', token);

        // Get user
        const { user } = await getAgent().get('auth/me');
        return { token, user };
      }
    } catch (err) {
      // Return error to form
      return { errors: err.response.body };
    }
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
