interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customer: string;
  contact: string;
  phone: string;
  orderDate: string;
  deliveryDate: string;
  amount: string;
  status: 'confirmed' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  items: OrderItem[];
}
