import { CreateAccountPayload } from './dto';

import { BASE_API_URL, api } from '@/services/index';

const FLAGS_API_BASE_URL = `${BASE_API_URL}/`;

export async function createAccount(payload: CreateAccountPayload) {
  const { data } = await api.post(`${FLAGS_API_BASE_URL}user/`, payload);

  return data;
}
