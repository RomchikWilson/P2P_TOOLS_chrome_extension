import okxIcon from "../src/assets/icons/crypto-exchanges/okx.png";
import bybitIcon from "../src/assets/icons/crypto-exchanges/bybit.png";

export interface ExchangeProps {
  icon: string;
  url: string;
}

export const CRYPTO_EXCHANGES = {
  okx: { icon: okxIcon, url: "https://www.okx.com"},
  bybit: { icon: bybitIcon, url: "https://www.bybit.com"},
} as const;

export enum FIAT_CURRENCY {
  uah = '₴'
}

export enum COIN_CURRENCY {
  usdt = 'USDT'
}

export enum ORDER_STATUSES {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}