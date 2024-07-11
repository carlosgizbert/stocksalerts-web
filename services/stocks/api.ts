import {
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

// export async function getFlag({ flag_id }: GetFeatureFlagPayload) {
//   const { data } = await api.get<GetFeatureFlagResponse>(
//     `${FLAGS_API_BASE_URL}/flags/auth/flag_id/${flag_id}/`,
//   );

//   return data;
// }

// export async function createFlag(payload: CreateFeatureFlagPayload) {
//   const { data } = await api.post(`${FLAGS_API_BASE_URL}/flags/auth/`, payload);

//   return data;
// }

// export async function patchFlag(payload: PatchFeatureFlagPayload) {
//   const { data } = await api.patch(
//     `${FLAGS_API_BASE_URL}/flags/auth/${payload.id}/`,
//     payload,
//   );

//   return data;
// }

// export async function deleteFlag(payload: DeleteFeatureFlagPayload) {
//   const { data } = await api.delete(
//     `${FLAGS_API_BASE_URL}/flags/auth/${payload.id}/`,
//   );

//   return data;
// }
