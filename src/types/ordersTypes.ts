import { CoinType, Exchange, FiatType, OperationStatus, OrderStatus, TransactionType } from "../enums";


// BASE FIELDS
export interface BaseExecutionData {
  fiatAmount: number;
  coinAmount: number;
  price: number;
  exchange: keyof typeof Exchange;
}

export interface BaseAdjustmentData {
  coinAmount: number;
  type: keyof typeof TransactionType;
  exchange: keyof typeof Exchange;
  comment: string;
}

export interface BaseGeneralData {
  price: number;
  fiatType: keyof typeof FiatType;
  fiatAmount: number;
  coinType: keyof typeof CoinType;
  coinAmount: number;
  exchange: keyof typeof Exchange;
}


// FETCH ORDER
interface GeneralData extends BaseGeneralData {
  status: keyof typeof OrderStatus;
}

export interface ExecutionData extends BaseExecutionData {
  id: number;
  status: keyof typeof OperationStatus;
}

export interface AdjustmentData extends BaseAdjustmentData {
  id: number;
  status: keyof typeof OperationStatus;
}

export interface FetchOrderData {
  generalData: GeneralData;
  executions: ExecutionData[];
  adjustments: AdjustmentData[];
}


// UPDATE ORDER
export interface UpdateOrderPayload {
  generalData?: GeneralData;
  executions?: ExecutionData[];
  adjustments?: AdjustmentData[];
}


// GET ORDER LIST
export type ListOrderFilters = {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
};

export interface ListOrderData extends GeneralData {
  id: number;
}