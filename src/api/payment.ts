import { API_URL, DEVICE_ID } from '@/config';
import { PostOrderPayload, PostOrderResponse } from '@/types';

export async function postOrder(payload: PostOrderPayload): Promise<PostOrderResponse> {
  const response = await fetch(`${API_URL}/orders`, {
    headers: { 'X-Device-Id': DEVICE_ID },
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return await response.json();
}
