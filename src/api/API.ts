import { getInstance } from './APIUtils';

export const api = {
  async get<T>(url: string) {
    const res = await getInstance().get<T>(url);
    return res.data;
  },

  async post<T>(url: string, payload: Record<string, unknown>) {
    const res = await getInstance().post<T>(url, payload);
    return res.data;
  },

  async delete<T>(url: string) {
    const res = await getInstance().delete<T>(url);

    return res.data;
  },
};
