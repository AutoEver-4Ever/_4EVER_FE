export interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  customer: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  orderDate: string;
  deliveryDate: string;
  amount: string;
  status: 'production' | 'ready' | 'shipping' | 'delivered' | 'confirmed';
  priority: 'low' | 'medium' | 'high';
  items: OrderItem[];
  notes?: string;
  paymentMethod?: string;
  deliveryAddress?: string;
}
