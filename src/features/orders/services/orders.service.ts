import type { Order, OrderStatus } from '../types/order.types';

// Placeholder — replace with real API calls when backend is ready
export const ordersService = {
  getOrders: async (): Promise<Order[]> => {
    throw new Error('ordersService.getOrders not yet implemented');
  },

  getOrderById: async (_id: string): Promise<Order> => {
    throw new Error('ordersService.getOrderById not yet implemented');
  },

  updateOrderStatus: async (_id: string, _status: OrderStatus): Promise<Order> => {
    throw new Error('ordersService.updateOrderStatus not yet implemented');
  },

  assignRider: async (_orderId: string, _riderId: string): Promise<Order> => {
    throw new Error('ordersService.assignRider not yet implemented');
  },
};
