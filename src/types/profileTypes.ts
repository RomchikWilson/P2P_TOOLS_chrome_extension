import { Exchange, OrderStatus } from "../enums";

export interface UserData {
  fullName: string;
  debt: number;
  interestRate: number;
}

export interface ResultData {
  income: number;
  bonus: number;
  loss: number;
}

export interface ResultsData {
  currentDay: ResultData;
  currentMonth: ResultData;
}

export interface ActiveOrderData {
  id: number;
  status: OrderStatus;
  totalProgress: number;
  currentProgress: number;
  exchange: keyof typeof Exchange;
}

export interface ProfileData {
  userInfo: UserData;
  results: ResultsData;
  orders: ActiveOrderData[];
}