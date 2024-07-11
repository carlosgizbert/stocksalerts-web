import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { signOut } from 'next-auth/react';

export const BASE_API_URL = 'http://localhost:8000';

export const CACHE_QUERY_KEYS = {
  useGetStocks: 'getStocks',
  useGetPriceEntries: 'getPriceEntries',
};

export const QUERIES_CONFIG = {
  staleTime: 120000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: 1,
  retryDelay: 3000,
}

export const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAccessToken = () => getCookie('@auth:jwt') ?? '';

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { response } = error;
    if (response && response.status === 401) {
      console.error("Logging out due to 401 error");
      await signOut({ redirect: true, callbackUrl: "/" });
    }
    return Promise.reject(error);
  }
);