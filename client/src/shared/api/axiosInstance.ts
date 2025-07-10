import type { AxiosError } from 'axios';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true, // важно: иначе кука не передаётся!
});

let accessToken = localStorage.getItem('accessToken') ?? '';

axiosInstance.interceptors.request.use((config) => {
  accessToken = localStorage.getItem('accessToken') ?? '';
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError & { config: { sent?: boolean } }) => {
    const prev = err.config;
    if (err.response?.status === 403 && !prev.sent) {
      prev.sent = true;
      const response = await axios.get<{ accessToken: string }>('/api/auth/refresh', {
        withCredentials: true,
      });
      accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      prev.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(prev);
    }
    return Promise.reject(err);
  },
);

export default axiosInstance;
