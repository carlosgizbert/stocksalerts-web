import {
  CreateStockPayload,
  EditStockPayload,
  GetPriceEntriesResponse,
  GetStocksResponse
} from './dto';

import { BASE_API_URL, api } from '@/services/index';

const FLAGS_API_BASE_URL = `${BASE_API_URL}/panel`;

export async function getStocks() {
  const { data } = await api.get<GetStocksResponse[]>(
    `${FLAGS_API_BASE_URL}/stock/`,
  );

  return data;
}

export async function getPriceEntries() {
  const { data } = await api.get<GetPriceEntriesResponse[]>(
    `${FLAGS_API_BASE_URL}/price-entry/`,
  );

  return data;
}

export async function createStock(payload: CreateStockPayload) {
  const { data } = await api.post(`${FLAGS_API_BASE_URL}/stock/`, payload);
  return data;
}

export async function editStock(payload: EditStockPayload) {
  const {
    id,
    check_frequency,
    lower_tunnel_limit,
    upper_tunnel_limit,
    symbol
  } = payload

  const { data } = await api.patch(
    `${FLAGS_API_BASE_URL}/stock/${id}`,
    {
      check_frequency,
      lower_tunnel_limit,
      upper_tunnel_limit,
      symbol,
      description: ''
    },
  );

  return data;
}

export async function deleteStock(id: string) {
  const { data } = await api.delete(
    `${FLAGS_API_BASE_URL}/stock/${id}`,
  );

  return data;
}
