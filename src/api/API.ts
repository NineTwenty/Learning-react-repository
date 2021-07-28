import { getAgent } from './APIUtils';

export const api = {
  async get(url: string) {
    const { ok, body } = await getAgent().get(url);

    if (ok) {
      return body;
    }
  },

  async post(url: string, payload: object) {
    const { ok, body } = await getAgent().post(url).send(payload);
    if (ok) {
      return body;
    }
  },
};
