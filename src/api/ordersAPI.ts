import axios from "axios";
import { UpdateOrderPayload, ListOrderFilters, BaseExecutionData, BaseAdjustmentData, FetchOrderData, BaseGeneralData } from "../types/ordersTypes";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const ORDERS_URL = `${import.meta.env.VITE_SERVER_URL}/orders/`

export const fetchOrders = async (filters: ListOrderFilters, page: number = 1) => {
  const requestFilters = {
    dateFrom: filters.dateFrom
      ? dayjs(filters.dateFrom).startOf("day").utc().format("YYYY-MM-DDTHH:mm:ss[Z]")
      : undefined,
    dateTo: filters.dateTo
      ? dayjs(filters.dateTo).endOf("day").utc().format("YYYY-MM-DDTHH:mm:ss[Z]")
      : undefined,
    status: filters.status || undefined,
  };
  
  const response = await axios.get(ORDERS_URL, {
    params: { ...requestFilters, page },
    withCredentials: true,
  });
  return response.data.orders;
};

export const fetchOrder = async (id: number) => {
  const response = await axios.get<FetchOrderData>(
    ORDERS_URL + id, { withCredentials: true });

  const data = response.data;

  if (Array.isArray(data.executions)) {
    data.executions.sort((a, b) => b.id - a.id);
  }

  if (Array.isArray(data.adjustments)) {
    data.adjustments.sort((a, b) => b.id - a.id);
  }

  return data;
};

export const createOrder = async (payload: BaseGeneralData) => {
  try {
    const response = await axios.post<BaseGeneralData>(
      `${ORDERS_URL}new/`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка создания ордера:", error);
    return null;
  }
};

export const createExecution = async (id: string, payload: BaseExecutionData): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${ORDERS_URL + id}/new-execution/`, 
      payload, 
      { withCredentials: true }
    );
    return response.data?.success === true;
  } catch (error) {
    return false;
  }
};

export const createAdjustment = async (id: string, payload: BaseAdjustmentData): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${ORDERS_URL + id}/new-adjustment/`,
      payload,
      { withCredentials: true }
    );
    return response.data?.success === true;
  } catch (error) {
    return false;
  }
};

export const updateOrder = async (id: string, payload: UpdateOrderPayload) => {
  if (!id) {
    throw new Error("ID is required to update an order.");
  }

  try {
    const response = await axios.put(ORDERS_URL + id, payload, 
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка редактирования ордера:", error);
    return null;
  }
};

export const changeOrderStatus = async (id: string) => {
  if (!id) {
    throw new Error("ID is required to update an order.");
  }

  try {
    const response = await axios.put(
      `${ORDERS_URL + id}/next-status/`, { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка смены статуса ордера:", error);
    return null;
  }
};