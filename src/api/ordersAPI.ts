import axios from "axios";
import { NewOrder, ListOrderFilters } from "../types/ordersTypes";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const URL = `${import.meta.env.VITE_SERVER_URL}/orders/`

export const fetchOrders = async (filters: ListOrderFilters, page: number = 1) => {
  const requestFilters = {
    dateFrom: filters.dateFrom
      ? dayjs(filters.dateFrom).utc().startOf("day").format("YYYY-MM-DDTHH:mm:ss[Z]")
      : undefined,
    dateTo: filters.dateTo
      ? dayjs(filters.dateTo).utc().endOf("day").format("YYYY-MM-DDTHH:mm:ss[Z]")
      : undefined,
    status: filters.status || undefined,
  };
  
  const response = await axios.get(URL, {
    params: {
      ...requestFilters,
      page,
    },
    withCredentials: true,
  });
  return response.data.orders;
};

export const createOrder = async (orderData: NewOrder): Promise<NewOrder | null> => {
  try {
    const response = await axios.post<NewOrder>(
      `${URL}new/`,
      orderData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка создания ордера:", error);
    return null;
  }
};

export const fetchOrderData = async (id: number) => {
  const response = await axios.get(URL + id, {
    withCredentials: true,
  });
  return response.data;
};