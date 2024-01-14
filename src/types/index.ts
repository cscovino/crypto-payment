export enum PaymentStatus {
  NR = 'NR',
  PE = 'PE',
  AC = 'AC',
  IA = 'IA',
  CO = 'CO',
  CA = 'CA',
  EX = 'EX',
  OC = 'OC',
  RF = 'RF',
  FA = 'FA',
  DE = 'DE',
}

export interface ErrorResponse {
  detail: string;
}

export interface Currency {
  symbol: string;
  name: string;
  min_amount: string;
  max_amount: string;
  image: string;
  blockchain: string;
}

export type GetCurrenciesResponse = Currency[];

export interface PostOrderPayload {
  expected_output_amount: number;
  input_currency: string;
  notes: string;
}

export interface PostOrderResponse {
  identifier: string;
  reference: string;
  payment_uri: string;
  web_url: string;
  address: string;
  tag_memo: string;
  input_currency: string;
  expected_input_amount: number;
  rate: number;
  notes: string;
  fiat: string;
  language: string;
}

export interface GetOrderResponse {
  identifier: string;
  reference: string;
  created_at: string;
  edited_at: string;
  status: string;
  fiat_amount: number;
  crypto_amount: number;
  unconfirmed_amount: number;
  confirmed_amount: number;
  currency_id: string;
  merchant_device_id: number;
  address: string;
  tag_memo: string;
  url_ko: string;
  url_ok: string;
  url_standby: string;
  expired_time: string;
  good_fee: boolean;
  notes: string;
  rbf: boolean;
  safe: boolean;
  fiat: string;
  language: string;
  percentage: number;
  received_amount: number;
  balance_based: string;
  internal_data: string;
  transactions: Transaction[];
}

export interface Transaction {
  confirmed: boolean;
  currency: string;
  amount: number;
  tx_hash: string;
  block: number;
  created_at: string;
}
