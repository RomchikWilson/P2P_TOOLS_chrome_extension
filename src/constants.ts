import okxIcon from "./assets/icons/crypto-exchanges/okx.png";
import bybitIcon from "./assets/icons/crypto-exchanges/bybit.png";

export interface ExchangeProps {
  icon: string;
  url: string;
}

export const CRYPTO_EXCHANGES = {
  OKX: { icon: okxIcon, url: "https://www.okx.com"},
  BYBIT: { icon: bybitIcon, url: "https://www.bybit.com"},
} as const;

export enum FIAT_CURRENCY {
  UAH = '₴'
}

export enum COIN_CURRENCY {
  USDT = 'USDT'
}

export enum ORDER_STATUSES {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

export enum OPERATION_STATUSES {
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

export enum TRANSACTION_TYPES {
  DEBIT = 'Debit',
  CREDIT = 'Credit',
}
