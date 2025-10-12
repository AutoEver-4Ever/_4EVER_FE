export interface SalesOrder {
  id: string;
  customer: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  orderDate: string;
  deliveryDate: string;
  amount: string | number;
  status: string;
  priority: string;
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  notes?: string;
  paymentMethod?: string;
  deliveryAddress?: string;
}
