import { getAgent } from './APIUtils';

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
