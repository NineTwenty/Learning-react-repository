import { getInstance } from './APIUtils';

const apiInstance = getInstance();

export const api = {
  async get<T>(url: string) {
    const res = await apiInstance.get<T>(url);
    return res.data;
  },

  async post<T>(url: string, payload: Record<string, unknown>) {
    const res = await apiInstance.post<T>(url, payload);
    return res.data;
  },

  async delete<T>(url: string) {
    const res = await apiInstance.delete<T>(url);

    return res.data;
  },
};
