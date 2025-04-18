import { CRYPTO_EXCHANGES } from "../constants";

export interface NewOrder {
  price: number;
  fiatAmount: number;
  coinAmount: number;
  exchangeType: keyof typeof CRYPTO_EXCHANGES;
}

export type OrderFilters = {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
};