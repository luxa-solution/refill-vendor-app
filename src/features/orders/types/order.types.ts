export type OrderStatus = 'pending' | 'confirmed' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  riderId?: string;
  riderName?: string;
  createdAt: string;
  updatedAt: string;
}
