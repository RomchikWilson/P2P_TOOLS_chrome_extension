import { CRYPTO_EXCHANGES } from "../constants";

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
    totalProgress: number;
    currentProgress: number;
    exchangeType: keyof typeof CRYPTO_EXCHANGES;
  }
  
  export interface ProfileData {
    userInfo: UserData;
    results: ResultsData;
    activeOrders: ActiveOrderData[];
  }