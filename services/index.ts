import axios from 'axios';

export const BASE_API_URL = 'http://localhost:8000';

export const CACHE_QUERY_KEYS: Readonly<any> = {
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

