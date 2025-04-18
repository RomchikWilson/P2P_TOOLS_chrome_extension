import axios from "axios";
import { NewOrder, OrderFilters } from "../types/ordersTypes";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const createOrder = async (orderData: NewOrder): Promise<NewOrder | null> => {
  try {
    const response = await axios.post<NewOrder>(
      `${SERVER_URL}/create-order/`,
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

export const fetchOrders = async (filters: OrderFilters, page: number = 1) => {
  const requestFilters = {
    dateFrom: filters.dateFrom
      ? dayjs(filters.dateFrom).utc().startOf("day").format("YYYY-MM-DDTHH:mm:ss[Z]")
      : undefined,
    dateTo: filters.dateTo
      ? dayjs(filters.dateTo).utc().endOf("day").format("YYYY-MM-DDTHH:mm:ss[Z]")
      : undefined,
    status: filters.status || undefined,
  };
  
  const response = await axios.get(`${SERVER_URL}/orders/`, {
    params: {
      ...requestFilters,
      page,
    },
    withCredentials: true,
  });
  return response.data.orders;
};
