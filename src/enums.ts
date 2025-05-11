export enum Exchange {
  OKX = "OKX",
  BYBIT = "BYBIT",
}

export enum FiatType {
  UAH = 'UAH'
}

export enum CoinType {
  USDT = 'USDT'
}

export enum OrderStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export const OrderStatusFlow: Record<OrderStatus, OrderStatus | null> = {
  [OrderStatus.ACTIVE]: OrderStatus.PENDING,
  [OrderStatus.PENDING]: OrderStatus.COMPLETED,
  [OrderStatus.COMPLETED]: null,
  [OrderStatus.CANCELED]: null,
};

export enum OperationStatus {
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}