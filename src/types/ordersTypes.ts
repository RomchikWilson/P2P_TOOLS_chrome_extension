import { COIN_CURRENCY, CRYPTO_EXCHANGES, FIAT_CURRENCY, OPERATION_STATUSES, ORDER_STATUSES, TRANSACTION_TYPES } from "../constants";

export interface NewOrder {
  price: number;
  fiatAmount: number;
  coinAmount: number;
  exchange: keyof typeof CRYPTO_EXCHANGES;
}

export type ListOrderFilters = {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
};

export interface ListOrderData {
  id: number;
  status: keyof typeof ORDER_STATUSES;
  exchange: keyof typeof CRYPTO_EXCHANGES;
  fiatAmount: number;
  price: number;
  coinAmount: number;
}

export type ExecutionData = {
  id: number;
  status: keyof typeof OPERATION_STATUSES;
  fiatAmount: number;
  coinAmount: number;
  price: number;
  exchange: keyof typeof CRYPTO_EXCHANGES;
}

export type AdjustmentData = {
  id: number;
  status: keyof typeof OPERATION_STATUSES;
  coinAmount: number;
  type: keyof typeof TRANSACTION_TYPES;
  comment: string;
}

export interface OrderData {
  price: number;
  fiatType: keyof typeof FIAT_CURRENCY;
  fiatAmount: number;
  coinType: keyof typeof COIN_CURRENCY;
  coinAmount: number;
  exchange: keyof typeof CRYPTO_EXCHANGES;
  executions: ExecutionData[];
  adjustments: AdjustmentData[];
}