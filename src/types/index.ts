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
