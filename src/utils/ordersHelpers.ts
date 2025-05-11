import { OrderStatus, OrderStatusFlow } from "../enums";

export const getNextOrderStatus = (status: OrderStatus): OrderStatus | null => {
    return OrderStatusFlow[status] || null;
};