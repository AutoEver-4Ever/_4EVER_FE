export interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'PENDING' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: number;
  soNumber: string;
  customerId: number;
  customerName: string;
  manager: {
    name: string;
    mobile: string;
  };
  contactName: string;
  contactPhone: string;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  statusCode: OrderStatus;
  actions: string[];
}

export interface OrderQueryParams {
  start: string;
  end: string;
  keyword: string;
  status: string;
  page: number;
  size: number;
}
