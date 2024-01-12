import { API_URL, DEVICE_ID } from '@/config';
import { GetCurrenciesResponse } from '@/types';

export async function getCurrencies(): Promise<GetCurrenciesResponse> {
  const response = await fetch(`${API_URL}/currencies`, { headers: { 'X-Device-Id': DEVICE_ID } });
  return await response.json();
}
